import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { omit } from 'lodash';

let app: INestApplication;
let prisma: PrismaService;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, PrismaModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  prisma = app.get(PrismaService);

  await prisma.publication.deleteMany();
  await prisma.medias.deleteMany();
  await prisma.posts.deleteMany();

  await app.init();
});

describe('AppController (e2e)', () => {
  it('/health (GET) => Should get an alive message', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect("I'm okay!");
  });
});
describe('/medias (POST)', () =>{
  it('Should create a media', async () => {
    return request(app.getHttpServer())
      .post('/medias')
      .send({
        title: 'facebook',
        username: 'marcelo',
      })
      .expect(HttpStatus.CREATED);
  });
  it('Should duplicate error on medias ', async () => {
    const media = await prisma.medias.create({
      data: {
        title: 'facebook',
        username: 'marcelo',
      },
    });
    await request(app.getHttpServer())
      .post('/medias')
      .send({
        title: 'facebook',
        username: 'marcelo',
      })
      .expect(HttpStatus.CONFLICT);
    const result = await prisma.medias.findFirst({
      where: { id: media.id },
    });
    expect(result).toBeTruthy();
  });
  it('Should return Bad Request when missing fields', async () => {
    return request(app.getHttpServer())
      .post('/medias')
      .send({
        title: 'facebook',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });
})
describe('/medias (GET)', () => {
  it('Should return all medias', async () => {
    const media = await prisma.medias.create({
      data: {
        title: 'facebook',
        username: 'marcelo',
      },
    });
    const response = await request(app.getHttpServer())
      .get('/medias')
      .expect(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: media.id,
          title: media.title,
          username: media.username,
        }),
      ]),
    );
  });
  it('Should return void array if no medias ', async () => {
    const response = await request(app.getHttpServer())
      .get('/medias')
      .expect(HttpStatus.OK);
    expect(response.body).toEqual([]);
  });
})
describe('/medias/:id (GET)', () => {
  it('Should return a media', async () => {
    const media = await prisma.medias.create({
      data: {
        title: 'facebook',
        username: 'marcelo',
      },
    });
    await request(app.getHttpServer())
      .get(`/medias/${media.id}`)
      .expect(HttpStatus.OK);
    const expectedMidia = {
      id: media.id,
      title: media.title,
      username: media.username,
    };
    const result = await prisma.medias.findFirst({
      where: { id: media.id },
    });
    const resultWithoutTimestamps = omit(result, ['createdAt', 'updatedAt']);
    expect(resultWithoutTimestamps).toEqual(expectedMidia);
  });
  it('Should return 404 if media not found', async () => {
    await request(app.getHttpServer())
      .get('/medias/1')
      .expect(HttpStatus.NOT_FOUND);
  });
})
describe ('/medias/:id (PUT)', () => {
  it('Should update a media', async () => {
    const media = await prisma.medias.create({
      data: {
        title: 'facebook',
        username: 'marcelo',
      },
    });
    await request(app.getHttpServer())
      .put(`/medias/${media.id}`)
      .send({
        title: 'Tiktok',
        username: 'marcelo',
      })
      .expect(HttpStatus.OK);
    const result = await prisma.medias.findFirst({
      where: { id: media.id },
    });
    expect(result).toBeTruthy();
    expect(result.title).toBe('Tiktok');
    expect(result.username).toBe('marcelo');
  });
  it('Should return 409 if title and username are not unique', async () => {
    const media1 = await prisma.medias.create({
      data: {
        title: 'facebook',
        username: 'marcelo',
      },
    });

    const media2 = await prisma.medias.create({
      data: {
        title: 'instagram',
        username: 'carlos',
      },
    });

    await request(app.getHttpServer())
      .put(`/medias/${media1.id}`)
      .send({
        title: 'instagram',
        username: 'carlos',
      })
      .expect(HttpStatus.CONFLICT);
  });
  it('Should update media if title and username are unique', async () => {
    const media = await prisma.medias.create({
      data: {
        title: 'facebook',
        username: 'marcelo',
      },
    });

    await request(app.getHttpServer())
      .put(`/medias/${media.id}`)
      .send({
        title: 'Tiktok',
        username: 'carlos',
      })
      .expect(HttpStatus.OK);

    const result = await prisma.medias.findFirst({
      where: { id: media.id },
    });

    expect(result).toBeTruthy();
    expect(result.title).toBe('Tiktok');
    expect(result.username).toBe('carlos');
  });
})
describe('/medias/:id (DELETE)', () => {
  it('Should delete a media', async () => {
    const media = await prisma.medias.create({
      data: {
        title: 'facebook',
        username: 'marcelo',
      },
    });
    await request(app.getHttpServer())
      .delete(`/medias/${media.id}`)
      .expect(HttpStatus.OK);
  });
  it('Should return 404 if media not found', async () => {
    await request(app.getHttpServer())
      .delete('/medias/1')
      .expect(HttpStatus.NOT_FOUND);
  });
  it('Should return 403 if media is linked', async () => {
    const media = await prisma.medias.create({
      data: {
        title: 'facebook',
        username: 'marcelo',
      },
    });
    const post = await prisma.posts.create({
      data: {
        title: 'facebook',
        text: 'marcelo',
      },
    });

    const publication = await prisma.publication.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: new Date(),
      },
    });

    await request(app.getHttpServer())
      .delete(`/medias/${media.id}`)
      .expect(HttpStatus.FORBIDDEN);
  });
})
describe('/posts (POST)', () => {
  it('Should create a post', async () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'facebook',
        text: 'marcelo',
      })
      .expect(HttpStatus.CREATED);
  });
  it('Should return Bad Request when missing fields', async () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'facebook',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });
}
)
describe('/posts (GET)', () => {
  it('Should return all posts', async () => {
    const post = await prisma.posts.create({
      data: {
        title: 'facebook',
        text: 'marcelo',
      },
    });
    const response = await request(app.getHttpServer())
      .get('/posts')
      .expect(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: post.id,
          title: post.title,
          text: post.text,
        }),
      ]),
    );
  });
  it('Should return void array if no posts ', async () => {
    const response = await request(app.getHttpServer())
      .get('/posts')
      .expect(HttpStatus.OK);
    expect(response.body).toEqual([]);
  }); 
})
describe('/posts/:id (GET)', () => {
  it('Should return a post ', async () => {
    const post = await prisma.posts.create({
      data: {
        title: 'facebook',
        text: 'marcelo',
      },
    });
    const espectedPost = {
      id: post.id,
      title: post.title,
      text: post.text,
    };
    const respone = await request(app.getHttpServer())
      .get(`/posts/${post.id}`)
      .expect(HttpStatus.OK);

    const result = await prisma.posts.findFirst({
      where: { id: post.id },
    });
    const resultWithoutTimestamps = omit(result, ['createdAt', 'updatedAt']);
    expect(resultWithoutTimestamps).toEqual(espectedPost);
  });
  it('Should return 404 if post not found', async () => {
    await request(app.getHttpServer())
      .get('/posts/1')
      .expect(HttpStatus.NOT_FOUND);
  });
})
describe('/posts/:id (PUT)', () => {
  it('Should update a post', async () => {
    const post = await prisma.posts.create({
      data: {
        title: 'facebook',
        text: 'marcelo',
      },
    });
    await request(app.getHttpServer())
      .put(`/posts/${post.id}`)
      .send({
        title: 'Tiktok',
        text: 'marcelo',
      })
      .expect(HttpStatus.OK);
    const result = await prisma.posts.findFirst({
      where: { id: post.id },
    });
    expect(result).toBeTruthy();
    expect(result.title).toBe('Tiktok');
    expect(result.text).toBe('marcelo');
  });
  it('Should return 404 if post not found', async () => {
    await request(app.getHttpServer())
      .put('/posts/1')
      .send({
        title: 'Tiktok',
        text: 'marcelo',
      })
      .expect(HttpStatus.NOT_FOUND);
  }); 
})
describe('/posts/:id (DELETE)', () => {
  it('Should delete a post', async () => {
    const post = await prisma.posts.create({
      data: {
        title: 'facebook',
        text: 'marcelo',
      },
    });
    await request(app.getHttpServer())
      .delete(`/posts/${post.id}`)
      .expect(HttpStatus.OK);
    const find = await prisma.posts.findFirst({
      where: { id: post.id },
    });
    expect(find).toBeFalsy();
  });
  it('Should return 404 if post not found', async () => {
    await request(app.getHttpServer())
      .delete('/posts/1')
      .expect(HttpStatus.NOT_FOUND);
  });
  it('Should return 403 if post is linked', async () => {
    const post = await prisma.posts.create({
      data: {
        title: 'facebook',
        text: 'marcelo',
      },
    });

    const media = await prisma.medias.create({
      data: {
        title: 'facebook',
        username: 'marcelo',
      },
    });
    const publication = await prisma.publication.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: new Date(),
      },
    });

    await request(app.getHttpServer())
      .delete(`/posts/${post.id}`)
      .expect(HttpStatus.FORBIDDEN);
  });
})
describe( '/publications (POST)', () => {
  it('Should create a publication', async () => {
    const media = await prisma.medias.create({
      data: {
        title: 'facebook',
        username: 'marcelo',
      },
    });
    const post = await prisma.posts.create({
      data: {
        title: 'facebook',
        text: 'marcelo',
      },
    });

    return request(app.getHttpServer())
      .post('/publications')
      .send({
        mediaId: media.id,
        postId: post.id,
        date: new Date(),
      })
      .expect(HttpStatus.CREATED);
  });
  it('Should return Bad Request when missing fields', async () => {
    return request(app.getHttpServer())
      .post('/publications')
      .send({
        mediaId: 1,
      })
      .expect(HttpStatus.BAD_REQUEST);
  });
  it('If mediaId or postId not found', async () => {
    await request(app.getHttpServer())
      .post('/publications')
      .send({
        mediaId: 1,
        postId: 1,
        date: '2023-08-21T13:25:17.352Z',
      })
      .expect(HttpStatus.NOT_FOUND);
  }); 
})
describe('/publications (GET)', () => {
  it('Should return all publications', async () => {
    const media = await prisma.medias.create({
      data: {
        title: 'facebook',
        username: 'marcelo',
      },
    });
    const post = await prisma.posts.create({
      data: {
        title: 'facebook',
        text: 'marcelo',
      },
    });
    const publication = await prisma.publication.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: new Date(),
      },
    });
    const response = await request(app.getHttpServer())
      .get('/publications')
      .expect(HttpStatus.OK);

    const expectedPublication = {
      id: publication.id,
      mediaId: publication.mediaId,
      postId: publication.postId,
      date: publication.date.toISOString(),
    };

    const receivedPublication = omit(response.body[0], [
      'createdAt',
      'updatedAt',
    ]);

    expect(receivedPublication).toEqual(expectedPublication);
  });
  it('Should return void array if no publications ', async () => {
    const response = await request(app.getHttpServer())
      .get('/publications')
      .expect(HttpStatus.OK);
    expect(response.body).toEqual([]);
  }); 
})
describe('/publications/:id (GET)', () => {
  it('Should return a publication ', async () => {
    const media = await prisma.medias.create({
      data: {
        title: 'facebook',
        username: 'marcelo',
      },
    });
    const post = await prisma.posts.create({
      data: {
        title: 'facebook',
        text: 'marcelo',
      },
    });
    const publication = await prisma.publication.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: new Date(),
      },
    });
    const expectedPublication = {
      id: publication.id,
      mediaId: publication.mediaId,
      postId: publication.postId,
      date: publication.date,
    };
    const response = await request(app.getHttpServer())
      .get(`/publications/${publication.id}`)
      .expect(HttpStatus.OK);
    const result = await prisma.publication.findFirst({
      where: { id: publication.id },
    });
    const resultWithoutTimestamps = omit(result, ['createdAt', 'updatedAt']);
    expect(resultWithoutTimestamps).toEqual(expectedPublication);
  });
  it('Should return 404 if publication not found', async () => {
    await request(app.getHttpServer())
      .get('/publications/1')
      .expect(HttpStatus.NOT_FOUND);
  }); 
})
describe('/publications/:id (PUT)', () => {
  it(' If not found should return 404', async () => {
    await request(app.getHttpServer())
      .put('/publications/1')
      .send({
        mediaId: 1,
        postId: 1,
        date: '2023-08-21T13:25:17.352Z',
      })

      .expect(HttpStatus.NOT_FOUND);
  });
})
describe('/publications/:id (DELETE)', () => {
  it('Should delete a publication', async () => {
    const media = await prisma.medias.create({
      data: {
        title: 'facebook',
        username: 'marcelo',
      },
    });
    const post = await prisma.posts.create({
      data: {
        title: 'facebook',
        text: 'marcelo',
      },
    });
    const publication = await prisma.publication.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: new Date(),
      },
    });
    await request(app.getHttpServer())
      .delete(`/publications/${publication.id}`)
      .expect(HttpStatus.OK);
  });
  it('Should return 404 if publication not found', async () => {
    await request(app.getHttpServer())
      .delete('/publications/1')
      .expect(HttpStatus.NOT_FOUND);
  }); 
})



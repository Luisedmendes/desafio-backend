import request from 'supertest';
import app from '../../server';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/IUser';

describe('UserController', () => {
  beforeEach(() => {
    
  });

  it('deve criar um novo usuário', async () => {
    const newUser = {
      id: 1,
      email: 'novousuario@example.com',
      password: 'senha123',
      planId: 1
    };

    const response = await request(app)
      .post('/users/cadastro')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message_code', 'user_created');
  });


  it('deve fazer login com credenciais válidas', async () => {
    const userData = {
      email: 'luisxb011',
      password: 'teste123',
    };

    const response = await request(app)
      .post('/users/login')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('não deve fazer login com credenciais inválidas', async () => {
    const userData = {
      email: 'email_de_um_usuario_existente',
      password: 'senha_incorreta',
    };

    const response = await request(app)
      .post('/users/login')
      .send(userData);

    expect(response.status).toBe(401);
  });

  it('não deve fazer login com email inexistente', async () => {
    const userData = {
      email: 'email_inexistente',
      password: 'qualquer_senha',
    };

    const response = await request(app)
      .post('/users/login')
      .send(userData);

    expect(response.status).toBe(401);
  });

  
});

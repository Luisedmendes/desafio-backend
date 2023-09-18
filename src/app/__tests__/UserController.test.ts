import request from 'supertest';
import app from '../../server';
import bcrypt from 'bcrypt';


describe('UserController', () => {
  

  it('deve criar um novo usuário', async () => {
    const newUser = {
      id: 1,
      email: 'novousuario@example.com',
      password: await bcrypt.hash('senha123', 10), 
      planId: 1
    };
  
    const response = await request(app)
      .post('/users/cadastro')
      .send(newUser);
  
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message_code', 'user_created');
  });

  // Criar um usuario com mesmo email e senha no BD para prosseguir com o teste
  it('deve fazer login com credenciais válidas', async () => {
    const userData = {
      email: 'luisxbnovo',
      password: '123',
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

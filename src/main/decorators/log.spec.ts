import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../presentation/protocols';

import { LogControllerDecorator } from './log';

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
}

function makeControllerStub(): Controller {
  class ControllerStub implements Controller {
    handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {},
      };
      return new Promise((resolve) => {
        resolve(httpResponse);
      });
    }
  }

  return new ControllerStub();
}

function makeSut(): SutTypes {
  const controllerStub = makeControllerStub();
  const sut = new LogControllerDecorator(controllerStub);
  return {
    sut,
    controllerStub,
  };
}

describe('Log Controller Decorator', () => {
  test('Should call Controller handle with correct value', async () => {
    const { sut, controllerStub } = makeSut();

    const controllerSpy = jest.spyOn(controllerStub, 'handle');

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await sut.handle(httpRequest);
    expect(controllerSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut();

    // const controllerSpy = jest.spyOn(controllerStub, 'handle');

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {},
    });
  });
});

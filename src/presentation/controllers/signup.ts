import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'

import { badRequest, serverError } from '../helpers/http-helper'

import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (err) {
      return serverError()
    }

    return {
      statusCode: 200,
      body: null
    }
  }
}

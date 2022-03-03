import { InvalidParamError, MissingParamError } from '../errors'
import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { badRequest, serverError } from '../helpers/http-helper'
import { AddAccount } from '../../domain/useCases/add-account'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

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

      const {
        name,
        email,
        password,
        passwordConfirmation
      } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const emailIsValid = this.emailValidator.isValid(email)

      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (err) {
      return serverError()
    }

    return {
      statusCode: 200,
      body: null
    }
  }
}

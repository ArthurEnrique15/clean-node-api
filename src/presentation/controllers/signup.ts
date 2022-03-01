import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('Missing param: name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('Missing param: email')
      }
    }

    return {
      statusCode: 200,
      body: null
    }
  }
}

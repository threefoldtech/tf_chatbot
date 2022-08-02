import { Questions } from './../../src/types/questions';
import { v4 } from 'uuid';
import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

enum Services {
  TASK = 'task', // regular choice message
  REQUEST_SERVICE = 'request', // choices question
  IS_ADMIN = 'isAdmin', // Yes/No question
  ECHO = 'echo', // input question
  COUNTRY = 'country', // dropmenu question
  END_TIME = 'end time', // date question
  FORM = 'form',
}

interface AskForService {
  logs: any;
  services: Questions;
}

let id = 1; // must be unique for every question during the session.
const chatId = (): string => v4().split('-')[0];

@WebSocketGateway(8081, {
  cors: {
    origin: 'http://localhost:8080',
  },
  transports: ['websocket', 'polling'],
})
export class AppGateway implements OnGatewayInit {
  private readonly logger = new Logger('AppGateway');
  client;

  async afterInit() {
    this.logger.log('Initialize!');
  }

  @SubscribeMessage('services')
  // respond to the 'services' message with the avilable services.
  handleServicesEvent(): Questions {
    return {
      type: 'question_choice',
      question: '### *Which Services are you looking for?*',
      id: id++,
      descr: '### *Which Services are you looking for?*',
      choices: [
        [Services.TASK, 'Do Something!'],
        [Services.IS_ADMIN, 'Is Admin!'],
        [Services.ECHO, 'Input Message!'],
        [Services.COUNTRY, 'Choose Country!'],
        [Services.END_TIME, 'When to delete!'],
        [Services.FORM, 'Deployment Specs!'],
      ],
      multi: false,
      sorted: false,
      sign: false,

      answer: '',
    };
  }

  @SubscribeMessage('askForService')
  // respond for the 'askForService' with the equevilant service is asked for.
  async handleMessageEvent(_: Socket, data: Services): Promise<AskForService> {
    this.logger.log(`Asking for ${data} service`);

    console.log({ data });

    if (typeof data === 'boolean') {
      const answer = data ? 'Yes' : 'No';
      return {
        logs: answer,
        services: this.handleServicesEvent(),
      };
    }

    switch (data) {
      case Services.TASK:
        return {
          logs: { [id - 1]: '### *Calling the chain...*' },
          services: this.handleServicesEvent(),
        };

      case Services.ECHO:
        return {
          logs: { [id - 1]: '### Eco a Message.. ' },
          services: {
            type: 'question',
            id: id++,
            question: '## Input your data?',
            descr: 'Hello',
            returntype: 'string',
            regex: '.*',
            regex_errormsg: '',
            min: 0,
            max: 0,
            sign: false,
            answer: '',
          },
        };

      case Services.IS_ADMIN:
        return {
          logs: { [id - 1]: '### Check Authority..' },
          services: {
            type: 'yn',
            chat_id: chatId(),
            question: '# Are you admin?',
            id: id++,
            answer: '',
          },
        };

      case Services.COUNTRY:
        return {
          logs: { [id - 1]: '### Select a Country' },
          services: {
            type: 'question_dropdown',
            question: '# Which Country?',
            id: id++,
            descr: 'Choose a Country',
            sorted: false,
            choices: [
              [false, 'Home'],
              [true, 'Egypt'],
              [false, 'Belguim'],
            ],
            multi: false,
            sign: false,
            answer: '',
          },
        };

      case Services.END_TIME:
        return {
          logs: { [id - 1]: '### Pick a date' },
          services: {
            type: 'q-date',
            id: id++,
            question: '## When to end the deployment?',
            answer: '2022-07-25',
          },
        };

      case Services.FORM:
        return {
          logs: { [id - 1]: '### Fill the Form' },
          services: {
            type: 'question_form',
            question: '# Answer the Qs',
            chat_id: chatId(),
            id: id++,
            description: '# Answer the Qs',
            form: [
              {
                type: 'question',
                id: id++,
                question: '## Input your data?',
                descr: 'Hello',
                returntype: 'string',
                regex: '.*',
                regex_errormsg: '',
                min: 0,
                max: 0,
                sign: false,
                answer: '',
              },
              {
                type: 'yn',
                chat_id: chatId(),
                question: '# Are you admin?',
                id: id++,
                answer: '',
              },
              {
                type: 'question_dropdown',
                question: '# Which Country?',
                id: id++,
                descr: 'Choose a Country',
                sorted: false,
                choices: [
                  [false, 'Home'],
                  [true, 'Egypt'],
                  [false, 'Belguim'],
                ],
                multi: false,
                sign: false,
                answer: '',
              },
            ],
            sign: false, //if sign then the result will also return a signed field
          },
        };

      default: {
        return {
          logs: data,
          services: this.handleServicesEvent(),
        };
      }
    }
  }
}

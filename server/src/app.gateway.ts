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
  services: any;
}

let id = 1; // must be unique for every question during the session.
const chatId = () => v4().split('-')[0];

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
  handleServicesEvent() {
    return {
      id: id++,
      type: 'question_choice',
      descr: '# `Which Services are you looking for?`',
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
          logs: '### *Calling the chain...*',
          services: this.handleServicesEvent(),
        };

      case Services.ECHO:
        return {
          logs: data,
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
          },
        };

      case Services.IS_ADMIN:
        return {
          logs: JSON.stringify(data),
          services: {
            type: 'yn',
            chat_id: chatId,
            question: '# Are you admin?',
            id: id++,
          },
        };

      case Services.COUNTRY:
        return {
          logs: '# Selected Country',
          services: {
            type: 'question_dropdown',
            id: id++,
            question: '# Which Country?',
            descr: 'Choose a Country',
            sorted: false,
            choices: [
              [false, 'Home'],
              [true, 'Egypt'],
              [false, 'Belguim'],
            ],
            multi: false,
            sign: false,
          },
        };

      case Services.END_TIME:
        return {
          logs: '# Choose End of time',
          services: {
            type: 'q-date',
            id: id++,
            question: '## When to end the deployment?',
            answer: '2022-07-25',
          },
        };

      case Services.FORM:
        return {
          logs: '# Fill the specs',
          services: {
            type: 'question_form',
            chat_id: chatId(),
            id: id++,
            description: '# Answer the Qs',
            form: [
              {
                type: 'question',
                question: '## Input your data?',

                id: id++,
                descr: 'aname',
                returntype: 'string', //can be bool, string, int, uint
                regex: '.*', //only relevant when string
                regex_errormsg: '', //shown when regex does not match, if not specified show regex
                min: 0, //only relevant when (u)int
                max: 0, //only relevant when (u)int
              },
              {
                type: 'yn',
                chat_id: 0,
                question: '# Are you admin?',
                id: id++,
              },
              {
                type: 'question_dropdown',
                id: id++,
                question: '# Which Country?',
                descr: 'Choose a Country',
                sorted: false,
                choices: [
                  [false, 'Home'],
                  [true, 'Egypt'],
                  [false, 'Belguim'],
                ],
                multi: false,
                sign: false,
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

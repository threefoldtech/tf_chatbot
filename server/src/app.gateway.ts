import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import Client from 'tfchain_client_ts';

enum Services {
  // INIT = 'init',
  PING = 'ping',
  LIST_TWINS = 'list twins',
  IS_ADMIN = 'isAdmin',
  OTHER_SERVICES = 'other',
  // DEPLOY = 'deploy',
  // BALANCE = 'getBalance',
}

interface AskForService {
  logs: any;
  services: any;
}

const deploymentQuestions = {
  name: 'Name your deployment.',
  memory: 'Choose your RAM size.',
  cpu: 'Choose your CPU cores.',
};

let id = 0;

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

  // @SubscribeMessage('init')
  // handleInitEvent() {
  //   console.log('entered init');
  //   return {
  //     type: 'question',
  //     id: id++,
  //     descr: 'Start using Chatbot with entering your Mnemonices',
  //     returntype: 'string',
  //     regex: '.*',
  //     regex_errormsg: '',
  //     min: 0,
  //     max: 0,
  //     sign: false,

  //     answer: '',
  //   };
  // }

  @SubscribeMessage('services')
  // respond to the 'services' message with the avilable services.
  handleServicesEvent() {
    return {
      id: id++,
      type: 'question_choice',
      descr:
        '# `Which` **service** *are* you [looking](https://www.google.com) for?',
      choices: [
        [Services.PING, 'Ping!'],
        [Services.LIST_TWINS, 'List Twins!'],
        [Services.OTHER_SERVICES, 'Request Service!'],
        [Services.IS_ADMIN, 'Is Admin!'],
        // [Services.DEPLOY, 'Deploy!'],
        // [Services.BALANCE, 'Get Balance!'],
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

    switch (data) {
      // case Services.INIT:
      //   this.client = new Client('wss://tfchain.dev.grid.tf', 'words');
      //   await this.client.init();
      //   return {
      //     logs: data,
      //     services: this.handleServicesEvent(),
      //   };

      case Services.PING:
        console.log(data);
        return {
          logs: '### *Pong!* and another **Ping**',
          services: this.handleServicesEvent(),
        };

      case Services.LIST_TWINS:
        // data sent with init the client is the mnemonices.
        const client = new Client('wss://tfchain.dev.grid.tf', data);
        await client.init();

        const twins = await client.listTwins();

        return {
          logs: twins,
          services: this.handleServicesEvent(),
          //   logs: 'Listing Twins',
          //   services: {
          //     type: 'question',
          //     id: 10,
          //     descr: 'Your mnemonics?',
          //     returntype: 'string', //can be bool, string, int, uint
          //     regex: '.*', //only relevant when string
          //     regex_errormsg: '', //shown when regex does not match, if not specified show regex
          //     min: 0, //only relevant when (u)int
          //     max: 0, //only relevant when (u)int
          //     sign: false, //if sign then the result will also return a signed field
          //   },
        };

      case Services.OTHER_SERVICES:
        // do something with the comming data
        const name = data;
        return {
          // return logs for the logs panerl & services for what to do next in the q panel?
          logs: name,
          // or return another inputquestion
          services: {
            type: 'question',
            id: 10,
            descr: 'Name the service?',
            returntype: 'string', //can be bool, string, int, uint
            regex: '.*', //only relevant when string
            regex_errormsg: '', //shown when regex does not match, if not specified show regex
            min: 0, //only relevant when (u)int
            max: 0, //only relevant when (u)int
            sign: false, //if sign then the result will also return a signed field
          },
        };

      case Services.IS_ADMIN:
        const answer = data;
        return {
          logs: answer,
          services: {
            type: 'question',
            id: 10,
            descr: 'Are you admin?',
            returntype: 'bool', //can be bool, string, int, uint
            regex: '.*', //only relevant when string
            regex_errormsg: '', //shown when regex does not match, if not specified show regex
            min: 0, //only relevant when (u)int
            max: 0, //only relevant when (u)int
            sign: false, //if sign then the result will also return a signed field
          },
        };

      // case Services.DEPLOY:
      //   // the data here is 'deploy'
      //   return {
      //     logs: data,
      //     services: {
      //       type: 'question',
      //       id: 11,
      //       descr: deploymentQuestions.name,
      //       returntype: 'bool', //can be bool, string, int, uint
      //       regex: '.*', //only relevant when string
      //       regex_errormsg: '', //shown when regex does not match, if not specified show regex
      //       min: 0, //only relevant when (u)int
      //       max: 0, //only relevant when (u)int
      //       sign: false, //if sign then the result will also return a signed field
      //     },
      //   };

      // case Services.BALANCE:
      //   const twinId = data;

      //   const twin = this.client.getTwin(twinId) as any;
      //   const balance = this.client.getBalance(twin.address);

      //   return {
      //     logs: balance,
      //     services: this.handleServicesEvent(),
      //   };

      // if you got any thing else than services go and init a chain clinet
      default: {
        //   /* Assume reset values for mns */
        //   const client = new Client('wss://tfchain.dev.grid.tf', data);
        //   await client.init();

        //   // console.log({ mn: data });
        //   return {
        //     logs: await client.listTwins(),
        //     services: this.handleServicesEvent(),
        //   };
        // }

        return {
          logs: data ? 'Authorized' : 'Not Authorized',
          services: this.handleServicesEvent(),
        };
      }
    }
  }
}

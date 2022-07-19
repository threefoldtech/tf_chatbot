import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import Client from 'tfchain_client_ts';

enum Services {
  PING = 'ping',
  LIST_TWINS = 'list twins',
  OTHER_SERVICES = 'other',
}
interface AskForService {
  logs: any;
  services: any;
}

let id = 0;

@WebSocketGateway(8081, {
  cors: {
    origin: 'http://localhost:8080',
  },
  transports: ['websocket', 'polling'],
})
export class AppGateway implements OnGatewayInit {
  private readonly logger = new Logger('AppGateway');

  afterInit() {
    this.logger.log('Initialize!');
  }

  // what to respond to a 'services' message?
  @SubscribeMessage('services')
  // with a list of the services avilable.
  handleServicesEvent() {
    return {
      id: id++,
      type: 'question_choice',
      descr: 'Which service are you looking for?',
      choices: [
        [Services.PING, 'Ping!'],
        [Services.LIST_TWINS, 'List Twins!'],
        [Services.OTHER_SERVICES, 'Request Service!'],
      ],
      multi: false,
      sorted: false,
      sign: false,
    };
  }

  // what to respond to a 'askForService' message?
  @SubscribeMessage('askForService')
  async handleMessageEvent(_: Socket, data: Services): Promise<AskForService> {
    // log in the server what services is asked for
    this.logger.log(`Asking for ${data} service`);

    // log in the server the data from the input
    console.log({ data });

    switch (data) {
      case Services.PING:
        return {
          logs: 'Pong!',
          services: this.handleServicesEvent(),
        };

      case Services.LIST_TWINS:
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
            descr: 'Your mnemonics?',
            returntype: 'string', //can be bool, string, int, uint
            regex: '.*', //only relevant when string
            regex_errormsg: '', //shown when regex does not match, if not specified show regex
            min: 0, //only relevant when (u)int
            max: 0, //only relevant when (u)int
            sign: false, //if sign then the result will also return a signed field
          },
        };

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
          logs: 'Service was not found',
          services: this.handleServicesEvent(),
        };
      }
    }
  }
}

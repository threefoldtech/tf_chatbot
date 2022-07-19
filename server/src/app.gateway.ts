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

  @SubscribeMessage('services')
  handleServicesEvent() {
    return {
      id: id++,
      type: 'question_choice',
      descr: 'Which service are you looking for?',
      choices: [
        [Services.PING, 'ping pong!'],
        [Services.LIST_TWINS, 'List Info!'],
      ],
      multi: false,
      sorted: false,
      sign: false,
    };
  }

  @SubscribeMessage('askForService')
  async handleMessageEvent(_: Socket, data: Services): Promise<AskForService> {
    this.logger.log(`Asking for ${data} service`);

    console.log({ data });

    switch (data) {
      case Services.PING:
        return {
          logs: 'Pong!',
          services: this.handleServicesEvent(),
        };

      case Services.LIST_TWINS:
        return {
          logs: 'Asking for mnemonics',
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

      default: {
        /* Assume reset values for mns */
        const client = new Client('wss://tfchain.dev.grid.tf', data);
        await client.init();

        // console.log({ mn: data });
        return {
          logs: await client.listTwins(),
          services: this.handleServicesEvent(),
        };
      }

      // return {
      //   logs: 'Service was not found',
      //   services: this.handleServicesEvent(),
      // };
    }
  }
}

interface AskForService {
  logs: any;
  services: any;
}

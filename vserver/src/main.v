import net
import net.websocket

enum Services {
	ping
	list
	is_admin
	other
}

type ServiceChoice = Services | string

struct Service {
	servicetype    string
	id             int
	descr          string
	returntype     string
	regex          string
	regex_errormsg string
	min            int
	max            int
	choices        []ServiceChoice
	multi          bool
	sorted         bool
	sign           bool
}

interface AskForService {
	logs string
	services Service
}

fn log_connect(mut c websocket.ServerClient) ?bool {
	println('Client: connected to server')
	return true
}

fn handle_message(mut c websocket.Client, msg &websocket.Message) ? {
	println(msg.payload)
	c.write('hello'.bytes(), msg.opcode)?
}

fn main() {
	// incoming message handler
	server_opt := websocket.ServerOpt{}
	mut server := websocket.new_server(net.AddrFamily.ip, 8081, '', server_opt)
	server.listen()?
	server.on_connect(log_connect)?
	server.on_message(handle_message)
}

/*
@SubscribeMessage('services')
  // respond to the 'services' message with the avilable services.
  handleServiceasEvent() {
    return Service{servicetype:, id:, descr:, returntype:, regex:, regex_errormsg:, min:, max:, sign:}{
      id: id++,
      servicetype: 'question_choice',
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
*/

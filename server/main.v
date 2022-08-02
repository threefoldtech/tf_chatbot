module main

import net.websocket
import term
import json
import base64

// this server accepts client connections and broadcast all messages to other connected clients
fn main() {
	println('press ctrl-c to quit...')
	start_server()?
}

fn start_server() ? {
	mut s := websocket.new_server(.ip6, 8081, '')
	// Make that in execution test time give time to execute at least one time
	s.ping_interval = 100
	s.on_connect(fn (mut s websocket.ServerClient) ?bool {
		// TODO: Check wether client info matches that of wizard
		if s.resource_name != '/' {
			return false
		}
		println('Client has connected...')
		return true
	})?

	s.on_message(fn (mut ws websocket.Client, msg &websocket.Message) ? {
		response := handle_message(msg)?
		ws.write(response.payload, response.opcode) or { panic(err) }
	})

	s.on_close(fn (mut ws websocket.Client, code int, reason string) ? {
		println(term.green('client ($ws.id) closed connection'))
	})
	s.listen() or { println(term.red('error on server listen: $err')) }
	unsafe {
		s.free()
	}
}

type Handler = fn ([]u8) []u8

fn handle_message(msg &websocket.Message) ?&websocket.Message {
	println('Received new message: $msg.payload')

	mut payload := []u8{}
	if msg.payload.bytestr() == 'services' {
		payload = handle_services(msg.payload)
	} else {
		payload = handle_services(msg.payload)
	}
	response := websocket.Message{
		opcode: msg.opcode
		payload: payload
	}

	return &response
}

struct MCMessage {
	id          int
	servicetype string
	descr       string
	choices     []string
	multi       bool
	sorted      bool
	sign        bool
}

fn handle_services(payload []u8) []u8 {
	response := json.encode(MCMessage{
		id: 1
		servicetype: 'question_choice'
		descr: '# `Which` **service** *are* you [looking](https://www.google.com) for?'
		choices: [
			'Ping!',
			'List Twins!',
			'Request Service!',
			'Is Admin!',
			// [Services.DEPLOY, 'Deploy!'],
			// [Services.BALANCE, 'Get Balance!'],
		]
		multi: false
		sorted: false
		sign: false
	})

	return response.bytes()
}

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

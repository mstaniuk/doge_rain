const dogeCoinWebSocketAddress = 'wss://ws.dogechain.info/inv';
const messageTypes = {
  status: 'status',
  transaction: 'utx'
}

export const init = (onDogeBought) => {
  const dogeCoinSocket = new WebSocket(dogeCoinWebSocketAddress);
  setupMessageHandling(dogeCoinSocket, {
    onDogeBought
  });
}

const setupMessageHandling = (socket, callbacks) => {
  if (socket) {
    socket.addEventListener('open', socketOpenedHandler);
    socket.addEventListener('message', socketReceivedMessageHandler(callbacks));
  }
}

const socketOpenedHandler = (event) => {
  console.log('wow such opened socket');
  event.target.send('{"op":"unconfirmed_sub"}');
}

const socketReceivedMessageHandler = (callbacks) => (socketEvent) => {
  const {data} = socketEvent;
  try {
    const dataObject = JSON.parse(data);
    const {
      op: type,
      msg: message,
      x: body
    } = dataObject;

    switch (type) {
      case messageTypes.status:
        socketReceivedStatusMessageHandler();
        break;
      case messageTypes.transaction:
        socketReceivedTransactionMessageHandler({body, callbacks});
        break;
      default:
        console.log('Wow! Such unhandled type!');
    }

  } catch (e) {
    console.log('wow! Such error', data, e);
  }
}

const socketReceivedStatusMessageHandler = () => {
}

const socketReceivedTransactionMessageHandler = ({body, callbacks}) => {
  const value = body.value_out / 1e8;
  const scale = Math.max(0.1, Math.min(Math.log(value) / 10, 2));
  console.log('Wow! Such Transaction!', value, scale);
  callbacks.onDogeBought(scale);
}

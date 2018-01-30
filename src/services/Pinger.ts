import axios from 'axios';

interface pingerProps {
  timer: number;
  url: string;
  onUpdate: Function;
}

export default class Pinger {
  private timer: number;
  private url: string;

  constructor(props: pingerProps) {
    this.timer = props.timer;
    this.url = props.url;
  }

  ping() {

  }
}

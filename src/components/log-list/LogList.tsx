import { FunctionComponent } from "react";
import { Log } from "../../typings/Log";

interface LogProps {
  log: Log;
}

const LogList: FunctionComponent<LogProps> = ({ log, ...props }: LogProps) => {
  return (
    <span {...props}>
      <strong>{log.playerName}</strong> rolled {log.dice}, moved from {log.from}
      {log.ladder &&
        ` to ${log.ladder.from}, hit a ladder and climbed to ${log.ladder.to}`}{" "}
      {log.snake &&
        ` to ${log.snake.from}, hit a snake and back to ${log.snake.to}`}
      {!log.ladder && !log.snake && `to ${log.to}`}
    </span>
  );
};

export default LogList;

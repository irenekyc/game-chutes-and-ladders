import { FunctionComponent } from "react";
import { Log } from "../../typings/Log";
import format from "date-fns/format";

interface LogProps {
  log: Log;
}

const LogList: FunctionComponent<LogProps> = ({ log, ...props }: LogProps) => {
  return (
    <li key={`${log.timestamp}-${log.player.name}`} {...props}>
      <strong>{log.player.name}</strong> threw {log.dice}, moved from {log.from}
      {log.ladder &&
        ` to ${log.ladder.from}, hit a ladder and climbed to ${log.ladder.to}`}{" "}
      {log.snake &&
        ` to ${log.snake.from}, hit a snake and back to ${log.snake.to}`}
      {!log.ladder && !log.snake && `to ${log.to}`}
    </li>
  );
};

export default LogList;

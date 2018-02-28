//这里有默认命令的集合
import addNode from "./addNode";
const commandList = [addNode];
export default function() {
  const self = this;
  for (let i = 0, l = commandList.length; i < l; i++) {
    const command = commandList[i];
    self.commands[command.name] = command;
  }
}
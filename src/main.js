import _ from 'lodash';
import {useImmer} from 'use-immer';
import React,{useState} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed'

function Screen() {
  const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: "Tui Grid Movement",
  });
  screen.key(["q", "C-c", "Esc"], function () {
    this.destroy();
  });
  return screen;
}


function GridControl(props) {
  return (
    <box>
      <box width={40} height={20}>
        <button
          left={7}
          top={0}
          content="+"
          shrink={true}
          mouse={true}
          onPress={function () {
            props.fn.up();
          }}
          padding={{ top: 1, right: 3, bottom: 1, left: 3 }}
          style={{ bg: "blue", fg: "white", focus: { bold: true } }}
        ></button>
        <button
          left={7}
          top={6}
          content="-"
          shrink={true}
          mouse={true}
          onPress={function () {
            props.fn.down();
          }}
          padding={{ top: 1, right: 3, bottom: 1, left: 3 }}
          style={{ bg: "blue", fg: "white", focus: { bold: true } }}
        ></button>
        <button
          left={0}
          top={3}
          content="<"
          onPress={function () {
            props.fn.left();
          }}
          shrink={true}
          mouse={true}
          padding={{ top: 1, right: 3, bottom: 1, left: 3 }}
          style={{ fg: "blue", bg: "white", focus: { bold: true } }}
        ></button>
        <button
          left={14}
          top={3}
          content=">"
          shrink={true}
          onPress={function () {
            props.fn.right();
          }}
          mouse={true}
          padding={{ top: 1, right: 3, bottom: 1, left: 3 }}
          style={{ fg: "blue", bg: "white", focus: { bold: true } }}
        ></button>
      </box>
    </box>
  );
}


function App() {
  const [global, updateGlobal] = useImmer({ x: 4, y: 4 });
  const fns = _.mapValues(
    {
      up: function (d) {
        d.y = (d.y + 7) % 8;
      },
      down: function (d) {
        d.y = (d.y + 1) % 8;
      },
      left: function (d) {
        d.x = (d.x + 7) % 8;
      },
      right: function (d) {
        d.x = (d.x + 1) % 8;
      },
    },
    function (f) {
      return function () {
        updateGlobal(f);
      };
    }
  );
  return (
    <box>
      <box left="2%" width={36} top="5%" height={18} border="line">
        <box
          bg="green"
          width={4}
          height={2}
          left={4 * global.x}
          top={2 * global.y}
        ></box>
      </box>
      <box top={3} left={40}>
        <GridControl global={global} fn={fns}></GridControl>
      </box>
    </box>
  );
}


function main() {
  render(<App></App>, Screen());
}


main()
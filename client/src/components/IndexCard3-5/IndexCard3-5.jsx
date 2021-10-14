import React from 'react';
import {
  Page,
  Text,
  View,
  PDFViewer,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import { useState } from 'react';

function IndexCard3by5({ tasks }) {
  console.log('tasks1', tasks);

  const [tasksForPrinting, setTasksForPrinting] = useState([
    {
      title: 'select one or more tasks for printing and click on the button',
      startDate: 'now',
    },
  ]);

  function checkBoxPicks() {
    // const checkedItems = document.getElementsByClassName("printCheckbox");

    // let idsOfcheckedTasks = checkedItems
    //   .filter((task) => task.checked)
    //   .map((checkedTask) => checkedTask.id);
    // console.log("ids", idsOfcheckedTasks);

    let idsOfcheckedTasks = [];
    const checkChoices = document.getElementsByClassName('printCheckbox');
    console.log('checkChoices', checkChoices);
    for (let i in checkChoices) {
      idsOfcheckedTasks.push(
        checkChoices[i].checked ? checkChoices[i].id : null
      );
    }
    let onlyIDs = idsOfcheckedTasks.filter((id) => id !== null);
    console.log('onlyIDs', onlyIDs);
    console.log('tasks2', tasks);
    let theCheckedItems = onlyIDs
      .map((id) => tasks.filter((task) => task._id === id))
      .flat();
    console.log('checked', theCheckedItems);
    // setTasksForPrinting()
    //   setTasksForPrinting((tasksForPrinting) => [
    //     ...tasksForPrinting,
    //     theCheckedItems.map(item => {...item, title: item.title, startDate: item.startDate})
    //   ]);
    // }
    setTasksForPrinting(theCheckedItems);
  }

  const styles = StyleSheet.create({
    body: {
      fontsize: 12,
    },
    label: {
      fontsize: 12,
      color: 'grey',
    },
  });

  return (
    <div className='indexCard'>
      <button type='button' class='button-print' onClick={checkBoxPicks}>
        Print selected tasks
      </button>
      <PDFViewer showToolbar='true' width='500' height='400'>
        <Document>
          {tasksForPrinting.map((atask) => (
            <Page key={atask._id} size='A7' orientation='landscape'>
              <Text style={styles.label}>Title: </Text>
              {/* {console.log("task for printing", taskForPrinting[0])} */}
              <Text style={styles.body}>{atask.title}</Text>
              <Text style={styles.label}>Start date: </Text>
              <Text style={styles.body}> {atask.startDate}</Text>
              <Text style={styles.label}>Due date: </Text>
              <Text style={styles.body}> {atask.startDate}</Text>
            </Page>
          ))}
        </Document>
      </PDFViewer>
    </div>
  );
}

export default IndexCard3by5;

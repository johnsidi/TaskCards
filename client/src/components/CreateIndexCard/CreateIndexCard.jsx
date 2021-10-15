import React from 'react';
import moment from 'moment';

import robotoFont from '../../assets/Roboto/Roboto-Light.ttf';
import robotoItalic from '../../assets/Roboto/Roboto-Italic.ttf';
import robotoBold from '../../assets/Roboto/Roboto-Bold.ttf';
import slimExtremeSingleLineFont from '../../assets/SlimExtreme/SlimExtreme.ttf';
import flamencoSingleLineFont from '../../assets/flamenco/Flamenco-Regular.ttf';

import {
  Page,
  Text,
  PDFViewer,
  Document,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

import { useState } from 'react';

function CreateIndexCard({ tasks, cardSize }) {
  // console.log('cardSize', cardSize);
  let passedSize = null;
  // let passedSize = [216, 360];
  cardSize === 'A4' || cardSize === 'A7'
    ? (passedSize = cardSize)
    : (passedSize = cardSize.split(' '));
  // console.log('passSize', passedSize);
  const [tasksForPrinting, setTasksForPrinting] = useState([
    {
      title:
        'select one or more tasks for printing and click on "Print Selected Tasks"',
      notes: '',
      startDate: '',
      dueDate: '',
      ticket: 'ticket number',
      estimatedTime: '',
    },
  ]);

  function checkBoxPicks() {
    // const checkChoices = document.getElementsByClassName('printCheckbox');
    // console.log('checkedItems', checkChoices);

    // let idsOfcheckedTasks = checkChoices
    //   .filter((task) => task.checked)
    //   .map((checkedTask) => checkedTask.id);
    // // console.log('ids', idsOfcheckedTasks);

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

    setTasksForPrinting(theCheckedItems);
  }

  Font.register({
    family: 'Roboto',
    fonts: [
      { src: robotoFont },
      { src: robotoItalic, fontStyle: 'italic' },
      { src: robotoBold, fontStyle: 'bold' },
    ],
  });

  // for T-cards size 2 logn slips
  let styles = {};
  if (cardSize === '360 123') {
    styles = StyleSheet.create({
      title: {
        fontFamily: 'Roboto',
        fontSize: 11,
        fontStyle: 'normal',
        marginLeft: 10,
        marginRight: -10,
        marginTop: 10,
        color: 'black',
      },
      label: {
        fontFamily: 'Roboto',
        fontSize: 10,
        fontStyle: 'normal',

        marginLeft: 10,
        marginRight: -10,
        marginTop: 5,
        marginBottom: 0,
        color: 'black',
      },
      metadata: {
        fontFamily: 'Roboto',
        fontSize: 10,
        fontStyle: 'normal',
        marginLeft: 10,
        marginRight: -10,
        marginTop: 5,
        color: 'black',
      },
    });
  } else {
    //for index card printing
    styles = StyleSheet.create({
      title: {
        fontFamily: 'Roboto',
        fontSize: 13,
        fontStyle: 'normal',
        marginLeft: 30,
        marginRight: 60,
        //for  Tcards 4+
        marginTop: 0,
        //for normal index cards
        //marginTop: 10,
        color: 'black',
      },
      label: {
        fontFamily: 'Roboto',
        fontSize: 10,
        fontStyle: 'normal',

        marginLeft: 30,
        marginRight: 60,
        marginTop: 5,
        marginBottom: 1,
        color: 'black',
      },
      metadata: {
        fontFamily: 'Roboto',
        fontSize: 10,
        fontStyle: 'normal',
        marginLeft: 10,
        marginRight: -10,
        marginTop: 5,
        color: 'black',
      },
    });
  }

  return (
    <div className='indexCard'>
      <PDFViewer showToolbar='true' width='500' height='370'>
        <Document>
          {tasksForPrinting.map((atask) => (
            <Page
              style={{
                flexDirection: 'column',
                // justifyContent: 'start',
                // paddingVertical: '0px',
                // marginVertical: '0px',
              }}
              key={atask._id}
              //a 3*5 index card in points
              // size={[216, 360]}
              // size='A7' //better for printing
              // size={cardSize}
              size={passedSize}
              orientation='landscape'
            >
              <Text key={atask._id} style={styles.title}>
                {/* {'Task: ' + atask.title + '\n\n'} */}
                {/* the tasks are sorted my creation date, the latest first - I
                want the index of the original array, the latest task has the
                biggest number
                - [ ] it is better to become optional in the future
                it is better not to delete any task in order for the ID to be unique */}
                {/* {'ID: ' + */}
                {atask.ticket.toString() + ' ' + atask.title + '\n\n'}
              </Text>
              <Text key={atask._id} style={styles.label}>
                Notes:
                <Text key={atask._id} style={styles.metadata}>
                  {atask.notes ? ' ' + atask.notes : ''}
                </Text>
              </Text>
              <Text key={atask._id} style={styles.label}>
                Tags:
                <Text key={atask._id} style={styles.metadata}>
                  {atask.category ? ' ' + atask.category : ''}
                </Text>
              </Text>
              <Text key={atask._id} style={styles.label}>
                Repeat:
                <Text key={atask._id} style={styles.metadata}>
                  {atask.repeat ? ' ' + atask.repeat : ''}
                </Text>
              </Text>
              <Text key={atask._id} style={styles.label}>
                Start date:
                <Text key={atask._id} style={styles.metadata}>
                  {atask.startDate ? ' ' + atask.startDate : ''}
                </Text>
              </Text>

              <Text key={atask._id} style={styles.label}>
                Due date:
                <Text key={atask._id} style={styles.metadata}>
                  {atask.dueDate ? ' ' + atask.dueDate : ''}
                </Text>
              </Text>
              <Text key={atask._id} style={styles.label}>
                Estimated time:
                <Text key={atask._id} style={styles.metadata}>
                  {atask.estimatedTime ? ' ' + atask.estimatedTime : ''}
                </Text>
              </Text>
              <Text key={atask._id} style={styles.label}>
                Creation date:
                <Text key={atask._id} style={styles.metadata}>
                  {' ' + moment(atask.createdAt).format('YYYY-MM-DD')}
                </Text>
              </Text>
              <Text key={atask._id} style={styles.label}>
                Skipped:
              </Text>
            </Page>
          ))}
        </Document>
      </PDFViewer>
      <button
        type='button'
        accessKey='p'
        title='ctrl + alt + p'
        className='button-print'
        onClick={checkBoxPicks}
      >
        Print Selected Tasks
      </button>
    </div>
  );
}

export default CreateIndexCard;

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from 'react-native';
import { Dimensions, TouchableOpacity } from 'react-native'
import { UCustomModal, CCustomModal, RCustomModal } from './modules/modal.js';
import {Url} from './modules/url.js'

const {width,height} = Dimensions.get('window')
const defaultNum = -1;

async function createFunc(_title, _content, setItems) {
  try{
    await fetch(Url + 'create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: _title, content: _content}),
    })
      .then((res) => {
        return res.json();
      })
  }catch{}
  await readFunc(setItems)
}

async function updateFunc(_id, _title, _content, setItems){
  try{
   await fetch(Url + 'update', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ id: _id, title: _title, content: _content}),
   })
     .then((res) => {
        return res.json();
     })
  }catch{}
  await readFunc(setItems)
}

async function deleteFunc(_id, setItems, setClickedNumber){
  try{
    await fetch(Url + 'delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: _id}),
    })
      .then((res) => {
        return res.json();
      })
  }catch{}
  setClickedNumber(defaultNum);
  await readFunc(setItems)
}

async function readFunc(setItems){
  const getResponse = await fetch('http://192.168.0.34:3001/read', {
    method: 'GET',
  });
  const getJson = await getResponse.json();
  const new_items = await fillItems(JSON.stringify(getJson))

  await setItems(new_items);
}

function fillItems(result){
  let _items = new Array;
  let earlyItems = new Array;
  if(result.split('"result"')[1] == ":\"no item\"}")
    earlyItems.push("\"Id\":0,\"Title\":\"No Content\",\"Content\":\"none\"");
  else
    earlyItems = result.split('[{')[1].split(']')[0].split('},{');

  for (var i = 0; i < earlyItems.length; i++) {
    var _id = earlyItems[i].split(',')[0].split(':')[1];
    var _title = earlyItems[i].split(',')[1].split(':')[1].split('"')[1];
    var _content = earlyItems[i].split(',')[2].split(':')[1].split('"')[1];
    _items.push({'id': _id,'title': _title,'content': _content});
  }
  return _items;
}

const App = () => {
  const [items, setItems] = useState({'id': 0,'title': 0,'content': 0});
  const [uModalVisible, setUModalVisible] = useState(false);
  const [cModalVisible, setCModalVisible] = useState(false);
  const [rModalVisible, setRModalVisible] = useState(false);
  const [title, setTitle] = useState('title');
  const [content, setContent] = useState('content');
  const [clickedNumber, setClickedNumber] = useState(defaultNum);

  var d = new Date();
  const keys = Array(items.length).fill().map((v,i)=> i);

  useEffect(()=>{
    readFunc(setItems);
  }, []);

  return (
    <View style ={{alignItems:'center', backgroundColor:'#FFFFF6F'}}>
      <UCustomModal 
        modalVisible={uModalVisible}
        setModalVisible={setUModalVisible}
        title={title}
        content={content}
        id={clickedNumber}
        setTitle={setTitle}
        setContent={setContent}
        updateFunc={updateFunc}
        setItems={setItems}/>
      <CCustomModal 
        modalVisible={cModalVisible}
        setModalVisible={setCModalVisible}
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        setItems={setItems}
        createFunc={createFunc}/>
      <RCustomModal 
        modalVisible={rModalVisible}
        setModalVisible={setRModalVisible}
        title={title}
        content={content}/>
      <View style = {styles.topContainer}>
        <Text style={styles.head}>{d.getMonth() + 1}월 {d.getDate()}일</Text>
      </View>
      <ScrollView style = {styles.scrollView}>
        {
          keys.map((key) =>{
            return (
              <View key = {key}>
                <TouchableOpacity
                onPress={()=>{
                  if(items[key].id != 0){
                    if(clickedNumber == items[key].id)
                      setClickedNumber(defaultNum);
                    else
                      setClickedNumber(items[key].id);
                      setTitle(items[key].title);
                      setContent(items[key].content);
                    }
                }}>
                  <Text style = {{...styles.items, 
                    color: (items[key]?.id == clickedNumber)? '#c0392b' : 'black'}}>
                    {items[key]?.id} {items[key]?.title} 
                  </Text>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Button 
        style={{borderRadius: 5}}
        onPress={()=> setCModalVisible(true)}
        title="추가"
        color="#c0392b"
        />
        <Button
        style={{borderRadius: 5}}
        onPress={()=>{if(clickedNumber > 0)setUModalVisible(true)}}
        title="수정"
        color="#c0392b"
        />
        <Button
        style={{borderRadius: 5}}
        onPress={()=>{if(clickedNumber > 0)setRModalVisible(true)}}
        title="보기"
        color="#c0392b"
        />
        <Button
        style={{borderRadius: 5}}
        onPress={()=> {if(clickedNumber > 0)deleteFunc(clickedNumber,setItems, setClickedNumber)}}
        title="삭제"
        color="#c0392b"
        />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  head:{
    fontSize: 20
  },
  topContainer:{
    marginTop: 15,
    alignItems: 'center',
  },
  scrollView:{
    backgroundColor:'#F6F6F6',
    marginTop: 10,
    paddingLeft:5,
    borderWidth: 1,
    borderRadius: 8,
    width: width * 0.9,
    height: height * 0.8,
  },
  bottomContainer:{
    marginTop: 10,
    marginBottom:16,
    width: width * 0.7,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  items:{
    fontSize: 30,
  },
});

export default App;
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import Modal from 'react-native-modal';

const {width,height} = Dimensions.get('window');

const UCustomModal = ({modalVisible, setModalVisible, title, content, id, setTitle, setContent, updateFunc, setItems}) => {
    return (
        <Modal isVisible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput 
                style={{
                    width:width*0.8
                }}
                placeholder={title}
                value={title}
                maxLength={20}
                onChangeText={(text) =>{
                  setTitle(text);
                }}/>
              <TextInput 
                style={{
                    height: height * 0.3,
                    width: width * 0.8
                }}
                multiline 
                placeholder={content}
                value={content}
                maxLength={250}
                onChangeText={(text) =>{
                  setContent(text);
                }}/>
              <View flexDirection='row'>
                <TouchableOpacity
                 style={styles.buttonClose}
                 onPress={() => {
                   updateFunc(id, title, content, setItems)
                   setModalVisible(false);
                 }}>
                 <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                   확인
                 </Text>
               </TouchableOpacity>
               <TouchableOpacity
                 style={styles.buttonClose}
                 onPress={() => {
                   setModalVisible(false);
                 }}>
                 <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                   취소
                 </Text>
               </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      );
};
export {UCustomModal};

const CCustomModal = ({modalVisible, setModalVisible, setItems, createFunc}) => {
  var title='Title';
  var content='Content';
  return (
      <Modal isVisible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput 
              style={{
                  width:width*0.8
              }}
              placeholder='title'
              maxLength={20}
              onChangeText={(text) =>{
                title=text;
              }}/>
            <TextInput 
              style={{
                  height: height * 0.3,
                  width: width * 0.8
              }}
              multiline 
              placeholder='content'
              maxLength={250}
              onChangeText={(text) =>{
                content=text
              }}/>
            <View flexDirection='row' >
              <TouchableOpacity
               style={styles.buttonClose}
                onPress={() => {
                  createFunc(title, content, setItems);
                  setModalVisible(false);
                }}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                  확인
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => {
                  setModalVisible(false);
                }}>
               <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                 취소
               </Text>
             </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
};
export {CCustomModal};

const RCustomModal = ({modalVisible, setModalVisible,title, content}) => {
  return (
      <Modal isVisible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text 
              style={{
                  width:width*0.8
              }}>
                {title+'\n'}
              </Text>
              
            <Text 
              style={{
                  height: height * 0.3,
                  width: width * 0.8
              }}>
                {content}
              </Text>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
};
export {RCustomModal};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 10,
      height: height * 0.5,
      width: width * 0.9,
      alignItems: 'center',
      elevation: 5,
      paddingVertical: 20,
    },
    buttonClose: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 45,
      backgroundColor: '#c0392b',
      elevation: 10,
      borderRadius: 5,
    },
  });
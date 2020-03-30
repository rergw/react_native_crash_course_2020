import React, {useState} from 'react'
import { StyleSheet, Text, FlatList, TextInput, View, Button } from 'react-native'
import { Icon } from 'react-native-elements'

const App = () => {
  const initialState = [
    {id: 1, text: "qwe"},
    {id: 2, text: "zxc"},
    {id: 3, text: "asd"},
  ]

  // ========== State ================
  const [items, setItems] = useState(initialState)
  const [newItem, setNewItem] = useState({})
  const [editIndex, setEditIndex] = useState()
  // ========== State END ================


  // ========== Functions ============
  const reset = () =>{
    setItems(initialState)
    setNewItem({})
  }

  const handleSave = () => {
    if(typeof editIndex == "number"){
      let newItems = items
      newItems[editIndex] = newItem
      setItems(newItems)
    }
    else{
      setItems([...items, newItem])
    }
    
    setNewItem({})
    setEditIndex()
  }

  const handleOnChange = (text) => {
    const id = newItem.id || Math.random()
    setNewItem({id: id, text: text})
  }

  const handleDelete = (id) =>{
    setItems(items.filter((item) => item.id != id))
  }

  const handleEdit = (item, index) => {
    setNewItem(item)
    setEditIndex(index)
  }
  // ========== Functions END ============


  // ========== Components ==============
  return (
    <View style={styles.root}>
    <Button onPress={reset} title="Reset"/>
    <TextInput onChangeText={handleOnChange} style={styles.input} value={newItem.text}/>
    <Button onPress={handleSave} title="Save"/>
    <Text>id: {newItem.id}</Text>
    <Text>text: {newItem.text}</Text>
    <Text>edit index: {editIndex}</Text>
    <FlatList
        data={items}
        renderItem={({ item, index }) =>
          <View style={styles.list}>
          <Text>{item.text}</Text>
          <Icon name='edit' onPress={() =>  handleEdit(item, index)}/>
          <Icon name='delete' onPress={() => handleDelete(item.id)}/>
          </View>
        }
        keyExtractor={item => item.id.toString()}
        />
    </View>
  )
}

export default App

// ===========  Styles =============
const styles = StyleSheet.create({
  root:{
    paddingTop: 25,
  },
  list:{
    flexDirection: 'row',
  },
  input:{
    borderWidth: 1,
    borderColor: 'black',
    height: 50
  }
})

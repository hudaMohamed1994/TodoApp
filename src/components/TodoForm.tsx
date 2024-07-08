import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {createTodo} from '../store/todoSlice';
import {AppDispatch} from '../store/store';

const TodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(createTodo(text));
      setText('');
      Keyboard.dismiss();
    } else {
      Alert.alert(
        'Invalid Task',
        'You need to enter a valid todo task, not an empty task.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Enter new task"
      />
      <Button title="Add Task" onPress={handleAddTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginRight: 10,
  },
});

export default TodoForm;

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet , Keyboard , Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';

interface TodoFormProps {
  editMode?: boolean;
  todo?: { id: string; text: string };
  onCancelEdit?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo }) => {
  const [text, setText] = useState(todo ? todo.text : '');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (text.trim()) {
      dispatch(addTodo({
        id: Math.random().toString(), // to generate Random UUID 
        text,
      }));
      setText('');
      Keyboard.dismiss(); // Close the keyboard
    }
    else {
      Alert.alert('Invalid Task', 'You need to enter a valid todo task, not an empty task.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={text}
        onChangeText={setText}
      />
      <Button title={"Add Todo Task"} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
});

export default TodoForm;
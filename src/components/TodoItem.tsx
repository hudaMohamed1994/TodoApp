import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { updateTodo, removeTodo } from '../store/todoSlice';
import CustomButton from './CustomButton';
import { AppDispatch } from '../store/store';

interface TodoItemProps {
  todo: { id: string; text: string; createdAt: string };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newText, setNewText] = useState(todo.text);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Update newText state when todo prop changes
  useEffect(() => {
    setNewText(todo.text);
  }, [todo]);

  const handleEdit = () => {
    setIsModalVisible(true);
  };

  const handleSave = () => {
    Keyboard.dismiss();
    if (newText.trim()) {
      dispatch(updateTodo({ id: todo.id, text: newText, createdAt: todo.createdAt }));
      setIsModalVisible(false); // Close the modal after saving
    } else {
      Alert.alert(
        'Invalid Task',
        'You need to enter a valid todo task, not an empty task.',
      );
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => dispatch(removeTodo(todo.id)),
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{todo.text}</Text>
          <Text style={styles.dateText}>Created: {new Date(todo.createdAt).toLocaleDateString()}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton title="Edit" onPress={handleEdit} />
          <CustomButton
            title="Delete"
            onPress={handleDelete}
            backgroundColor="red"
          />
        </View>
      </View>
      {/* Modal Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        onShow={() => {
          setNewText(newText); // Set initial text to previous todo text
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              value={newText}
              onChangeText={setNewText}
              placeholder="Enter updated task"
              onSubmitEditing={handleSave}
            />
            <View style={styles.modalButtonContainer}>
              <CustomButton title="Save" onPress={handleSave} />
              <CustomButton
                title="Cancel"
                onPress={() => setIsModalVisible(false)}
                backgroundColor="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
  },
  dateText: {
    fontSize: 12,
    color: '#5f79b7',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    fontSize: 18,
    paddingVertical: 10,
    width: '100%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
});

export default TodoItem;

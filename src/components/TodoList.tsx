import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos?: {id: string; text: string ,createdAt: string }[];
}

const TodoList: React.FC<TodoListProps> = ({todos}) => {
  const todosFromStore = useSelector((state: RootState) => state.todos.todos);
  const data = todos && todos.length > 0 ? todos : todosFromStore;

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({item}) => <TodoItem key={item.id} todo={item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noDataText}>No todos available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
});

export default TodoList;

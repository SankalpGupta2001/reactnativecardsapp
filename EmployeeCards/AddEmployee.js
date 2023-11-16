import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddEmployeeForm = ({ onAddEmployee }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddEmployee = () => {
    
    const newEmployee = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID 
      name,
      email,
      phone,
      parentId: null, // Set parentId as null
      backgroundColor: '#FFFFFF',
    };

    
    onAddEmployee(newEmployee);

    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <Button title="Add Employee" onPress={handleAddEmployee} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddEmployeeForm;

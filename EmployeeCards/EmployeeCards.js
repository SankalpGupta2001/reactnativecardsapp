import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EmployeeCard = ({ employee, allEmployees }) => {
  const [showSubordinates, setShowSubordinates] = useState(false);

  const handlePress = () => {
    setShowSubordinates(!showSubordinates);
  };

  const renderSubordinates = () => {
    if (!showSubordinates) return null;

    const subordinates = allEmployees.filter(emp => emp.parentId === employee.id);
    return subordinates.map(subordinate => (
      <Text key={subordinate.id} style={styles.subordinateText}>
        - {subordinate.name}
      </Text>
    ));
  };

  const textColor = employee.backgroundColor === 'black' ? '#FFFFFF' : '#000000';


  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.card, { backgroundColor: employee.backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Name: {employee.name}</Text>
      <Text style={[styles.title, { color: textColor }]}>Email: {employee.email}</Text>
      <Text style={[styles.title, { color: textColor }]}>Phone: {employee.phone}</Text>
      <Text style={[styles.title, { color: textColor }]}>Manager: {employee.parent || 'No Manager'}</Text>
        {showSubordinates && (
          <View style={styles.subordinatesContainer}>
            <Text style={styles.subordinateTitle}>Subordinates:</Text>
            {renderSubordinates()}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    margin: 8,
  
    width: 320, 
    height: 300, 
    
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  }, 
  text: {
    marginBottom: 8,
  },
  subordinatesContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  subordinateTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subordinateText: {
    marginLeft: 10,
  },
});

export default EmployeeCard;

import React, { useState, useEffect } from 'react';
import EmployeeCard from './EmployeeCards';
import { ScrollView, View, Text, StyleSheet, TextInput ,TouchableOpacity} from 'react-native';
import AddEmployeeForm from './AddEmployee';


export default function App() {
  const [employeeData, setEmployeeData] = useState([]);



  const handleAddEmployee = newEmployee => {

    const reportingManagerId = 1;

    const employeeWithID = {
      id: Math.floor(Math.random() * 1000), // Existing ID generation
      name: newEmployee.name,
      email: newEmployee.email,
      phone: newEmployee.phone,
      parentId: reportingManagerId, // Set parentId to the reporting manager's ID
      backgroundColor: '#FFFFFF',
    };
    setEmployeeData([...employeeData, employeeWithID]);
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d`);
        const data = await response.json();

        const employeeMap = data.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {});

        data.forEach((employee) => {
          const { parentId } = employee;
          if (parentId !== null && employeeMap[parentId]) {
            employee.parent = employeeMap[parentId].name;
          } else {
            employee.parent = 'No Manager';
          }
        });

        console.log(data);
        setEmployeeData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);







  return (
    <View style={styles.container}>
   
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <View style={styles.addButton}>
          <AddEmployeeForm onAddEmployee={handleAddEmployee} />
        </View>

        {employeeData.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} allEmployees={employeeData}
          />
        ))}

      </ScrollView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  singleCardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});








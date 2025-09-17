import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const App = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);

  const onPress = (value) => {
    setExpression((prev) => prev + value);
  };

  const onResult = () => {
    try {
      if (/\/0(?!\d)/.test(expression)) {
        setResult('Error');
        setExpression("it can't be done");
      } else {
        const evalResult = eval(expression.replace('^', '**')); 
        setExpression(String(evalResult)); 
        setResult(evalResult);
      }
    } catch (error) {
      setResult('Error');
      setExpression('Error');
    }
  };

  const clear = () => {
    setExpression('');
    setResult(null);
  };

  const renderButton = (value) => (
    <TouchableOpacity
      key={value}
      style={styles.button}
      onPress={() => onPress(value)}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.display}
        keyboardType='numeric'
        value={expression}
        onChangeText={setExpression}
      />
      <View style={styles.buttonContainer}>
        {['7', '8', '9', '+'].map(renderButton)}
        {['4', '5', '6', '-'].map(renderButton)}
        {['1', '2', '3', '*'].map(renderButton)}
        {['0', 'C', '=', '/'].map((value) => (
          value === '=' ? (
            <TouchableOpacity
              key={value}
              style={styles.button}
              onPress={onResult}
            >
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          ) : value === 'C' ? (
            <TouchableOpacity
              key={value}
              style={styles.button}
              onPress={clear}
            >
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          ) : renderButton(value)
        ))}
        {['.', '^'].map((value) => (
          <TouchableOpacity
            key={value}
            style={styles.pointButton}
            onPress={() => onPress(value)}
          >
            <Text style={styles.buttonText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007dcd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  display: {
    fontSize: 40,
    marginVertical: 20,
    height: 100,
    borderColor: 'white', 
    textAlign: 'right',
    width: '95%',
    borderRadius: 20,
    backgroundColor: 'white',
    color: '#0063a6',
  },

  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },

  button: {
    width: '20%',
    height: 60,
    margin: '1.7%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },

  buttonText: {
    fontSize: 24,
    color: '#0063a6',
  },

  pointButton: {
    width: '44%',
    height: 50,
    margin: '1.7%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  }
});

export default App;

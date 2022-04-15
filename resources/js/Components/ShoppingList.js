import React from 'react';

export default function ({name}) {
    return (
        <ShoppingList name={name} />
    );
}

class ShoppingList extends React.Component {
    render() {
      return (
        <div className="shopping-list">
          <h1>Shopping List for {this.props.name}</h1>
          <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Oculus</li>
          </ul>
        </div>
      );
    }
  }
  
  // Example usage: <ShoppingList name="Mark" />
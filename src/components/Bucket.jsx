import { useState } from 'react';
import BucketForm from './BucketForm';

function Bucket(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    eagerness: '',
  });

  console.log(props.bucket);

  const submitUpdate = (value) => {
    // logic to call the editBucketItem prop with the supplied values
    props.editBucketItem(edit.id, value);
    // Sets the key:value pairs in the `edit` object back to empty strings
    setEdit({ id: null, value: '', eagerness: '' });
  };

  // If the user is attempting to edit an item, render the bucket form with the edit variable passed as a prop
  if (edit.id) {
    return <BucketForm edit={edit} onSubmit={submitUpdate} />;
  }

  return props.bucket.map((item, i) => (
   // Adds a className of `bucket-row complete ${item.eagerness}` for completed items, and `bucket-row ${item.eagerness}` for non-completed items
    <div
      className={
        item.isComplete
          ? `bucket-row complete ${item.eagerness}` // Ternary operator
          : `bucket-row ${item.eagerness}` 
      }
      // Adds a key attribute set to the value of the index position
      key={i}
    >
      {/* Adds an onClick event that invokes the `completeBucketItem` method passing the item id as a argument */}
      <div key={item.id} onClick={() => props.completeBucketItem(item.id)}>
       {/* Adds the item text here */}
        {item.text}
      </div>
      <div className="icons">
        {console.log(item)}
        {/* Adds an onClick event update the `edit` object with the `id`, `value`, and `eagerness` properties */}
        <p onClick={() => setEdit({ id: item.id, value: item.text, eagerness: item.eagerness })}> ✏️</p>
        {/* Adds an onClick event that will invoke the removeBucketItem method passing in the `item.id` */}
        <p onClick={() => props.removeBucketItem(item.id)}> 🗑️</p>
      </div>
    </div>
  ));
}

export default Bucket;

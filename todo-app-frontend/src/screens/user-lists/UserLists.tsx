import React, { useContext } from 'react';
import classes from './UserLists.module.css';
import { UserContext } from '../../App';

function UserLists() {

  return <div className={classes.container}>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
  </div>;
}

export default UserLists;

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useEffect, useState } from 'react';
import { createStyles, FormControl, Grid, Input, InputLabel, makeStyles, MenuItem, Select, TextField, Theme, IconButton, Fab, Button, Chip} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: '100%'
    },
    deleteIcon:{
        marginTop:15,
        color: theme.palette.error.main
    },
    selectFormControl: {
      margin: theme.spacing(1),
      width: 170
    },
    autoCompleteControl: {
      '& .MuiFormControl-marginNormal': {
        marginTop: 0
      }
    },
    redColor: {
      color: theme.palette.error.main
    }
  })
);

type Props = {
    changeHandler: any,
  streamConfigsObj: Array<any>
};

export default function MultiMetricComponent({
    changeHandler,
    streamConfigsObj
}: Props) {
    const classes = useStyles();
    const [streamConfigObj, setStreamConfigObj] = useState(streamConfigsObj);
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };

    const addButtonClick = ()=>{
        let data = {columnName:"",transformFunction:""};
        let tempStreamConfigObj = [...streamConfigObj,data];
        setStreamConfigObj(tempStreamConfigObj);
        changeHandler('transformConfigs',tempStreamConfigObj);
    }

    const inputChange = (input,index, value) =>{
        let tempStreamConfigObj = [...streamConfigObj]
        tempStreamConfigObj[index][input] = value;
        setStreamConfigObj(tempStreamConfigObj);
    }

    const updateJson = () =>{
        changeHandler('transformConfigs',streamConfigObj);
    }

    const deleteClick = (index) =>{
        let tempStreamConfigObj = {...streamConfigObj};
        tempStreamConfigObj.splice(index,1);
        changeHandler('transformConfigs',tempStreamConfigObj)
    }

    useEffect(() => {
        setStreamConfigObj(streamConfigsObj);
    }, [streamConfigsObj]);


  return (
    <Grid container spacing={2}>
        <h3 className="accordion-subtitle">Transform functions</h3>
                {
                    streamConfigObj.map((o,i)=>{
                        return(
                            <Grid item xs={4}>
                                <Grid container spacing={2}>
                                    <Grid item xs={5}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor={o.columnName}>Column Name</InputLabel>
                                            <Input
                                                id={o.columnName}
                                                value={o.columnName}
                                                key={i+"keyval"}
                                                onChange={(e)=> inputChange("columnName",i,e.target.value)}
                                                onBlur={updateJson}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor={i+"keymulti"}>Transform Function</InputLabel>
                                            {/* <Select
                                                labelId={o.transformFunction}
                                                id={o.transformFunction}
                                                value={i+"valuemulti"}
                                                onChange={(e)=> inputChange("transformFunction",i,e.target.value)}
                                                onBlur={updateJson}
                                            > */}
                                                <Select
                                                    id={i+"keymulti"}
                                                    labelId={i+"keymulti"}
                                                    key={i+"keymulti"}
                                                    multiple
                                                    value={o.transformFunction || []}
                                                    onChange={(e)=> inputChange("transformFunction",i,e.target.value)}
                                                    input={<Input id="select-multiple-chip" />}
                                                    renderValue={(selected) => (
                                                        <div className={"chips"}>
                                                        {(selected as string[]).map((value) => (
                                                            <Chip key={value} label={value} className={"chip"} />
                                                        ))}
                                                        </div>
                                                    )}
                                                    MenuProps={MenuProps}
                                                    >
                                                <MenuItem value="HOURLY">HOURLY</MenuItem>
                                                <MenuItem value="DAILY">DAILY</MenuItem>
                                            </Select>
                                        </FormControl>

                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl>
                                            <IconButton aria-label="delete" className = {classes.deleteIcon} onClick={()=>{
                                                deleteClick(i)}}>
                                                <ClearIcon />
                                            </IconButton>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>)
                        })
                }
                <Grid item xs={3}>
                <FormControl className={classes.formControl}>
                    <Button
                    aria-label="plus"
                    variant="outlined"
                    color="primary"
                    onClick={addButtonClick}
                    startIcon={(<AddCircleIcon />)}
                    >
                        Add new Field
                    </Button>
                </FormControl>
                </Grid>
    </Grid>
  );
}
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Box, Button, Container, TextField, Typography } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import WorkIcon from '@mui/icons-material/Work';

import { getSlugFromContainerUrl } from '../../selectors/urls';
import useStyles from './useStyle'
import AppBar from '../../containers/AppBar';
import ResultCard from './components/ResultCard';
import ResultStepTitle from './components/ResultStepTitle';


const Search = ({
  fieldValues,
  goToSearchField,
  setResults,
  setSearchFields,
  setSelectedValues,
  loadData,
  loading,
  resourceValues,
  searchIndex,
  results,
  resultsByStructure,
  searchFields,
  selectedValues
}) => {

  const classes = useStyles();
  
  const [selectedField, setSelectedField] = useState(null);
  const [checked, setChecked] = useState([]);
  const [textFieldValue, setTextFieldValue] = useState('');
  
  let selectedFieldValues = null
    if (selectedField?.name) {
    selectedFieldValues = fieldValues[selectedField.name];
  }
  
  const isResultsStep = searchIndex === searchFields.length

  /*
  console.log('>> selectedField:', selectedField);
  console.log('>> selectedFieldValues:', selectedFieldValues);
  console.log('>> checked:', checked);
  console.log('>> textFieldValue:', textFieldValue);
  console.log('>+ resourceValues:', resourceValues);
  console.log('>+ fieldValues:', fieldValues);
  console.log('>+ searchIndex:', searchIndex);
  console.log('>+ searchFields:', searchFields);
  console.log('>+ selectedValues:', [...selectedValues]);
  console.log('>+ results', results);
  console.log('>+ resultsByStructure', resultsByStructure);
  */
  
  const handleNewSearchClick = () => {
    console.log('----------START----------');
    setSelectedField(null);
    setSelectedValues([]);
    setResults([]);
    setChecked([]);
    setTextFieldValue(null);
    setSearchFields([]);
    goToSearchField(0);
    displayField(0);
  }

 const goToNextField = (field, backward=false) => {
    const newIndexField = searchFields.indexOf(field) + (backward ? -1 : 1);
    goToSearchField(newIndexField);
  }

  const setChosenField = (field, value, replace=false) => {
    const choiceFieldIndex = searchFields.indexOf(field);
    if (replace) {
      const currentChosenExist = searchFields.find(sf=>sf.parent===field.name);
      if (currentChosenExist) {
        // delete current chosen-field
        searchFields.splice(choiceFieldIndex+1 , 1)
        // replace selected values
        const newSelectedValues = selectedValues.filter(sv => 
          sv.field.parent!==field.name && sv.field.name!==field.name
        );
        newSelectedValues.push({ field: field, value: value });
        setSelectedValues(newSelectedValues);
      }
    }
    if (value.type !== 'no-choice') {
      // add chosen-field
      searchFields.splice(choiceFieldIndex+1 , 0, value);
    }
    setSearchFields([...searchFields]);
  }

  const displayField = (searchIndex) => {
    const field = searchFields[searchIndex];
    if (! field || ! selectedField || field.name !== selectedField.name) {
      setChecked([]);
      setTextFieldValue('');
      setSelectedField(field);
      const currentSelectedValue = selectedValues.find(sv => sv.field.name === field.name);
      if (currentSelectedValue) {
        if (field.multiple) {
          setChecked(currentSelectedValue.value);
        }
        if (field.type === 'range') {
          setTextFieldValue(currentSelectedValue.value.id);
        }
      }
    }
  };
  
  const handleTextFieldChange = (evt) => {
    setTextFieldValue(evt.target.value);
  }
  
  const handleClickValue = (field, value) => {
    if (value) {
      if (field.type === 'field-choice') {
        value.id = value.name
      }
      const currentValueForField = selectedValues.find(selectedValue => selectedValue.field.name === field.name);
      if (! currentValueForField) {
        if (field.type !== 'chosen-field') {
          selectedValues.push({ field: field, value: value });
        } else {
          // insert chosen-field just after parent field-choice
          const choiceFieldIndex = selectedValues.findIndex(sv=> sv.field.name === field.parent);
          selectedValues.splice(choiceFieldIndex+1, 0, { field: field, value: value });
        }
        setSelectedValues([...selectedValues]);
        if (field.type === 'field-choice') {
          setChosenField(field, value)
        }
      } else {
        if (currentValueForField.value.id === value.id && ! Array.isArray(currentValueForField.value)) {
          goToNextField(field);
          return;
        } else {
          if (field.type === 'field-choice') {
            setChosenField(field, value, /*replace=*/true);
          } else {
            setSelectedValues(selectedValues.map(selectedValue => {
              if (selectedValue.field.name === field.name) {
                selectedValue.value = value
              }
              return selectedValue
            }))
          }
        }
      }
    } else {
      setSelectedValues(selectedValues.filter(selectedValue => selectedValue.field.type !== field.type));
    }
    setResults([]);
    goToNextField(field);
  };

  const findResults = async () => {
    if (!resourceValues) {
      return;
    }
    let results = resourceValues['programs'];
    selectedValues.forEach(sv => {
      if (sv.field.type !== 'field-choice') {
        switch (sv.field.type) {
          case 'range':
            const minFieldName = sv.field.min;
            const maxFieldName = sv.field.max;
            const value = sv.value.id;
            results = results.filter(result => {
              const minBoundOk = ! result[minFieldName] || result[minFieldName] <= value;
              const maxBoundOk = ! result[maxFieldName] || result[maxFieldName] >= value;
              return minBoundOk && maxBoundOk;
            })
          break;
          default:
            const fieldName = sv.field.name;
            // single selected value to array :
            const values = [].concat(sv.value);
            // array of all selected ids for the current field
            const valueIds = values.map(v => v.id)
            results = results.filter(result => {
              // result kept if no value for the current field
              if (! result[fieldName] && ! sv.field.required) { 
                return true
              } else {
                // single value to array for the current field
                let resultValues = [].concat(result[fieldName])
                // check if at least one result value matches with one selected value
                let resultOk = false;
                resultValues.forEach(rv => {
                  if (valueIds.includes(rv)) {
                    resultOk = true;
                  }
                })
                return resultOk;
              }
            })
        }
      }
    })
    setResults(results);
  }
  
  const FormatedTitle = ({title}) => {
    const safeHTMLTags = ['HTML', 'HEAD', 'BODY', 'STRONG', 'BR']
    const doc = new DOMParser().parseFromString(title, 'text/html');
    const htmlTags = Array.prototype.slice.call(doc.getElementsByTagName("*")).map(tag => tag.nodeName);
    const isSafeHtml = htmlTags.every((tag, index) => safeHTMLTags.includes(tag));
    if (isSafeHtml) {
      return <div dangerouslySetInnerHTML={{ __html: title }}></div>;
    } else {
      return <div>{title}</div>;
    }
  }
  
  useEffect( () => { 
    loadData();
  }, [])
  
  useEffect( () => { 
    if (selectedValues.length > 0) {
      findResults();
    }
  }, [selectedValues])
  
  useEffect( () => { 
    if (! loading && results.length === 0) {
      handleNewSearchClick();
    }
  }, [loading]);
  
  useEffect( () => { 
    if ( searchFields.length > 0) {
      if(searchIndex < 0 ) {
        goToSearchField(0);
      } else if(searchIndex > searchFields.length-1 ) {
        goToSearchField(searchFields.length);
        setSelectedField(null);
      } else {
        displayField(searchIndex);  
      }
    }
  }, [searchIndex]);

  return (
    <>
      <AppBar />
      { loading &&
        <div className="loading">
          Chargement, veuillez patienter...
        </div>
      }
      { ! loading && searchFields.length > 0 &&
        <Container className={classes.mainContainer} maxWidth="sm">
          { ! isResultsStep &&
            <>
              { selectedField &&
                <Typography component="h2" variant="h2" className={classes.stepTitle}>
                  <FormatedTitle title={selectedField.title}/>
                </Typography>
              }
              <Box pb={4} mt={-1} className={classes.criteriasContainer}>
                { 
                  searchFields.filter(field => selectedField === field).map((field, index) => {
                    
                    if (field.type === 'range') {
                      
                      return (
                        <Box key={index} className={classes.criteriaContainerText}>
                          <TextField 
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={handleTextFieldChange}
                            defaultValue={textFieldValue}
                          />
                          <Box className={classes.nextButtonContainer}>
                            <Button 
                              variant="contained" 
                              color="secondary"
                              className={classes.nextButton}
                              onClick={()=>handleClickValue(field, {id:textFieldValue})}
                            >
                              Suivant
                            </Button>
                          </Box>
                        </Box>
                      )
                      
                    } else {
                    
                      const isChoice = field.type === 'field-choice';
                      const fieldsArray = isChoice ? selectedField.fields : selectedFieldValues;
                      const matchField = isChoice ? 'name' : 'id';
                      
                      const handleToggle = (value) => () => {
                        const currentIndex = checked.findIndex(c => c.id === value.id);
                        console.log('handleToggle-0', value, currentIndex, [...checked]);
                        const newChecked = [...checked];
                        
                        console.log('handleToggle-av', [...newChecked]);

                        if (currentIndex === -1) {
                          newChecked.push(value);
                        } else {
                          newChecked.splice(currentIndex, 1);
                        }
                        console.log('handleToggle-ap', [...newChecked]);

                        setChecked(newChecked);
                      };
                      
                      return(
                        <Box key={index}>
                          { ! field.multiple && fieldsArray && 
                            <Box className={classes.criteriaContainer}>
                              { 
                                fieldsArray.map((value, index) => {
                                  let className = classes.criteriaButtonContainer;
                                  if (field.fullWidth || value.fullWidth) {
                                    className = `${className} ${classes.fullWidth}`;
                                  }
                                  if (isChoice || field.type === 'chosen-field') {
                                    className = `${className} ${classes.choiceButton}`;
                                  }
                                  if (field.type === 'boolean') {
                                    className = `${className} ${classes.booleanButton}`;
                                  }
                                  if (field.icon || value.icon) {
                                    className = `${className} ${classes.iconButton}`;
                                  }
                                  return (
                                    <Box pt={2} key={index} className={className}>
                                      <Button 
                                        variant="contained" 
                                        color={selectedValues.find(sv =>(sv.value[matchField] === value[matchField])) !== undefined
                                          ? "primary"
                                          : "default"}
                                        onClick={()=>handleClickValue(field, value)}
                                      >
                                        {value.label}
                                      </Button>
                                    </Box>
                                  )
                                })
                              }
                            </Box>
                          }
                          { field.multiple && fieldsArray &&
                            <Box key={index} className={classes.criteriaContainerMultiple}>
                              <List>
                                { fieldsArray.map((value, index) => {
                                  const labelId = `checkbox-list-label-${value.id.substring(value.id.lastIndexOf('/')+1)}`;
                                  // console.log('labelId', value, labelId);
                                  return (
                                    <ListItem
                                      key={index}
                                      disablePadding
                                    >
                                      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                        <ListItemIcon>
                                          <Checkbox
                                            edge="start"
                                            checked={checked.find(c => c.id === value.id) !== undefined}
                                            tabIndex={-1}
                                            disableRipple
                                          />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={value.label} />
                                      </ListItemButton>
                                    </ListItem>
                                  );
                                })}
                              </List>
                              <Box className={classes.nextButtonContainer}>
                                <Button 
                                  variant="contained" 
                                  color="secondary"
                                  className={classes.nextButton}
                                  onClick={()=>handleClickValue(field, checked)}
                                >
                                  Suivant
                                </Button>
                              </Box>
                            </Box>
                          }
                        </Box>
                      )
                    }
                  })
                }
              </Box>
            </>
          }
          <Box>
            { isResultsStep &&
              <Box> 
                { results && 
                  <Box>
                    { results.length === 0 &&
                      <Box p={3}>
                        <p>Aucun résultat : Veuillez modifier vos critères de recherche.</p>
                      </Box>
                    }
                    <Box p={3}>
                      <ResultStepTitle
                        length={resultsByStructure.length}
                        titleClassName={classes.stepTitle}
                        subTitleClassName={classes.stepSubtitle}
                      />
                    </Box>
                    <List>
                      { resultsByStructure.map((result, index) => (
                        <ListItem
                          button key={index}
                          component={Link}
                          to={`/structures/${getSlugFromContainerUrl('organizations', result.id)}`}
                          className={classes.resultListItem}
                        >
                          <ResultCard
                            id={result.id}
                            label={result.label}
                            depictedBy={result.depictedBy}
                          />
                        </ListItem>
                      )) }
                    </List>
                  </Box>
                }
              </Box>
            }
          </Box>
        </Container>
      }
    </>
  );
};

export default Search;
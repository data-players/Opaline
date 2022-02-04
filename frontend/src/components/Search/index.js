import React, { useRef, useState, useEffect } from 'react';

import { Avatar, Box, Button, Chip, Container, TextField } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import OrganizationIcon from '@material-ui/icons/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import WorkIcon from '@mui/icons-material/Work';

import useStyles from './useStyle'
import searchConfig from './searchConfig.json';

import DataFactory from '@rdfjs/data-model';
const { literal, namedNode, quad, variable } = DataFactory;

const Search = ({ 
  addBooleanField,
  fetchContainer,
  resourceValues,
  fieldValues
}) => {

  const classes = useStyles();
    
  
  const getSearchStep = (step) => {
    return searchSteps.indexOf(step)
  }
  const searchSteps = ['start', 'field', 'results'];
  const [searchStep, setSearchStep] = useState(getSearchStep('start'));
  const [selectedResource, setSelectedResource] = useState();
  const [searchFields, setSearchFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [results, setResults] = useState();
  const [checked, setChecked] = useState([]);
  const [textFieldValue, setTextFieldValue] = useState();
  
  let selectedFieldValues = null
    if (selectedField?.name) {
    selectedFieldValues = fieldValues[selectedField.name];
  }
  

  console.log('>> selectedResource:', selectedResource);
  console.log('>> searchStep:', searchStep);
  console.log('>> searchFields:', searchFields);
  console.log('>> selectedField:', selectedField);
  console.log('>> selectedFieldValues:', selectedFieldValues);
  console.log('>> selectedValues:', [...selectedValues]);
  console.log('>> results', results);
  console.log('>> checked:', checked);
  console.log('>+ resourceValues:', resourceValues);
  console.log('>+ fieldValues:', fieldValues);

  
  const handleNewSearchClick = () => {
    const rootContainer = searchConfig[0];
    setSearchStep(getSearchStep('start'));
    setSelectedField(null);
    setSelectedValues([]);
    setResults(null);
    setChecked([]);
    setTextFieldValue(null);
    setSelectedResource(rootContainer);
    setSearchFields(rootContainer.fields);
    goToNextField(rootContainer, null);
  }

  const goToNextField = (resource, field, backward=false) => {
    const nextField = findNextField(resource, field, backward);
    if (nextField) {
      handleFieldClick(nextField);
      return nextField;
    }
  }
  
  const findNextField = (resource, selectedField, backward=false) => {
    if (! resource) {
      return; 
    }
    if (! selectedField) {
      return Object.values(resource.fields)[0]; 
    }
    const fieldIndex = searchFields.findIndex(field => field.name === selectedField.name);
    if (fieldIndex === -1) {
      return; 
    }
    if (! backward ) {
      if (fieldIndex >= (Object.keys(searchFields).length - 1)) {
        handleResultsStepClick();
        return; 
      }
      return Object.values(searchFields)[fieldIndex + 1];
    } else {
      if (fieldIndex === 0) {
        return; 
      }
      return Object.values(searchFields)[fieldIndex - 1];
    }
  }
  
  const handleClickLeftCriteriaChevron = () => {
    goToNextField(selectedResource, selectedField, true);
  }
  const handleClickRightCriteriaChevron = () => {
    goToNextField(selectedResource, selectedField);
  }
  
  const setChosenField = (field, value, replace=false) => {
    const choiceFieldIndex = searchFields.indexOf(field);
    if (replace) {
      const currentChosenExist = searchFields.find(sf=>sf.parent===field.name);
      if (currentChosenExist) {
        // delete current chosen-field
        searchFields.splice(choiceFieldIndex+1 , 1)
        // delete old selected value
        const valueIndex = selectedValues.findIndex(sv=>sv.field.parent===field.name);
        selectedValues.splice(valueIndex, 1);
        setSelectedValues([...selectedValues]);
      }
    }
    if (value.type !== 'no-choice') {
      // add chosen-field
      searchFields.splice(choiceFieldIndex+1 , 0, value)
    }
    setSearchFields([...searchFields]);
  }

  const handleFieldClick = (field) => {
    if (field !== selectedField) {
      setChecked([]);
      setTextFieldValue('');
      setSelectedField(field);
      if (searchFields.findIndex(sf => sf.name === field.name) > 0) {
        setSearchStep(getSearchStep('field'));
      } else {
        setSearchStep(getSearchStep('start'));
      }
      //setSearchStep(getSearchStep('field'));
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
  
  const handleValueClick = (field, value) => {
    if (value) {
      // id filling
      if (! value.id) {
        value.id = value.name
      }
      const currentValueForField = selectedValues.find(selectedValue => selectedValue.field === field);
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
          goToNextField(selectedResource, field);
          return;
        } else {
          if (field.type === 'field-choice') {
            setChosenField(field, value, /*replace=*/true)
          }
          setSelectedValues(selectedValues.map(selectedValue => {
            if (selectedValue.field === field) {
              selectedValue.value = value
            }
            return selectedValue
          }));
          setSelectedValues([...selectedValues]);
        }
      }
    } else {
      setSelectedValues(selectedValues.filter(selectedValue => selectedValue.field.type !== field.type));
    }
    setResults(null);
    goToNextField(selectedResource, field);
  };
  
  const handleDeleteSelectedValueClick = (field, value) => {
    setResults(null);
    setSelectedValues(selectedValues.filter(selectedValue => selectedValue.value.id !== value.id));
  }
  
  const getResults = async () => {
    if (!resourceValues) {
      return;
    }
    let results = resourceValues.data;
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
  
  useEffect( () => { 
    if (selectedValues.length > 0) {
      getResults();
    }
  }, [selectedValues])
  
  const resultsRef = useRef(null);
  const handleResultsStepClick = () => {
    setSearchStep(getSearchStep('results'));
    setSelectedField(null);
    resultsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
  }

  //== Get all data
  const getData = (data) => {
    data.forEach(field => {
      switch (field.type) {
        case 'field-choice':
        getData(field.fields);
        break;
        case 'boolean':
        addBooleanField(field);
        break;
        default:
        fetchContainer(field);
      }
    })
  }
  
  useEffect( () => { 
    const rootContainer = searchConfig[0];
    fetchContainer(rootContainer);
    getData(rootContainer.fields);
    handleNewSearchClick();
  }, []);


  return (
    <Container className={classes.mainContainer} maxWidth="lg">
      { selectedResource &&
        <>
          <h1>Rechercher {selectedResource.label}</h1>
          <Box className={classes.stepsContainer}>
            {
              searchFields.map((field, index) => (
                <Box className={classes.stepContainer} key={index}>
                  <Box>
                    <Button 
                      variant="contained" 
                      disabled={selectedField === field}
                      onClick={()=>handleFieldClick(field)}
                    >
                      {field.label}
                    </Button>
                  </Box>
                  { ( Object.keys(selectedValues).length !== 0 ||
                      index !== (searchFields.length - 1) 
                    ) &&
                      <ChevronRightIcon className={classes.stepChevron}/>
                  }
                </Box>
              ))
            }
            { Object.keys(selectedValues).length > 0 &&
              <Box p={1}>
                <Button 
                  variant="contained" 
                  disabled={searchStep === getSearchStep('results')}
                  onClick={()=>handleResultsStepClick()}
                >
                  Résultats 
                  { results &&
                    <span>&nbsp;({results.length})</span>
                  }
                </Button>
              </Box>
            }
          </Box>
          { searchStep === getSearchStep('field') &&
            <hr/>
          }
        </>
      }
      { searchStep === getSearchStep('results') &&
        <>
          { selectedValues.length === 0 &&
            searchStep === getSearchStep('results') &&
              <Box p={3}>
                <p>Veuillez sélectionner au moins un critère de recherche.</p>
              </Box>
          }
          { selectedValues.length > 0 &&
            <Box pb={1} mt={-1} className={classes.selectedCriterias}>
              {
                selectedValues.map((selectedValue, index) => {
                  
                  if (selectedValue.field.type !== 'field-choice') {
                    let label = '';
                    switch (selectedValue.field.type) {
                      case 'boolean':
                        label = selectedValue.field.label + ' : ' + selectedValue.value.label
                      break;
                      case 'range':
                        label = selectedValue.field.label + ' : ' + selectedValue.value.id
                      break;
                      default:
                        if (! Array.isArray(selectedValue.value)) {
                          label = selectedValue.value.label
                        } else {
                          selectedValue.value.forEach(v => {
                          if (label !== '') { label += '/' }
                            label = label + v.label;
                          })
                        }
                    }
                    return (
                      selectedValue &&
                        <Box pt={1} pl={2} key={index}>
                          <Chip 
                            label={label}
                            onClick={()=>handleDeleteSelectedValueClick(selectedValue.field, selectedValue.value)}
                            onDelete={()=>handleDeleteSelectedValueClick(selectedValue.field, selectedValue.value)}
                          />
                        </Box>
                    )
                  }
                })
              }
            </Box>
          }
        </>
      }
      { searchStep !== getSearchStep('results') &&
        <>
          { searchStep !== getSearchStep('start') &&
            <h2>Précisez votre recherche :</h2>
          }
          <Box pb={4} mt={-1} className={classes.criteriasContainer}>
            { selectedResource &&
              <Box className={classes.criteriaChevronContainer}>
                { searchStep !== getSearchStep('start') &&
                  <ChevronLeftIcon
                    className={classes.criteriaChevron}
                    onClick={() => handleClickLeftCriteriaChevron()}
                  />
                }
              </Box>
            }
            { 
              searchFields.filter(field => selectedField === field).map((field, index) => {

                if (field.type === 'range') {
                  
                  return (
                    <Box key={index} className={classes.criteriaContainer}>
                      <Box>
                        <TextField 
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          onChange={handleTextFieldChange}
                          defaultValue={textFieldValue}
                        />
                      </Box>
                      <Box pt={3}>
                        <Button 
                          variant="contained" 
                          color="default"
                          className={classes.noChoiceButton}
                          onClick={()=>handleValueClick(field, {id:textFieldValue})}
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
                  const multiple = field.multiple;
                  
                  const handleToggle = (value) => () => {
                    const currentIndex = checked.indexOf(value);
                    const newChecked = [...checked];

                    if (currentIndex === -1) {
                      newChecked.push(value);
                    } else {
                      newChecked.splice(currentIndex, 1);
                    }

                    setChecked(newChecked);
                  };
                  
                  return(
                    <Box key={index} className={classes.criteriaContainer}>
                      { ! multiple && fieldsArray &&
                        <Box className={ (selectedFieldValues?.length > 6) ? classes.manyCriterias : null }>
                          { 
                            fieldsArray.map((value, index) => (
                              <Box pt={2} key={index}>
                                <Button 
                                  variant="contained" 
                                  color={selectedValues.find(sv => (sv.value[matchField] === value[matchField])) ? "primary" : "secondary"}
                                  onClick={()=>handleValueClick(field, value)}
                                >
                                  {value.label}
                                </Button>
                              </Box>
                            ))
                          }
                        </Box>
                      }
                      { multiple && fieldsArray &&
                        <>
                          <List sx={{ /*width: '100%', maxWidth: 360, bgcolor: 'background.paper'*/ }}>
                            { fieldsArray.map((value, index) => {
                              const labelId = `checkbox-list-label-${value}`;
                              return (
                                <ListItem
                                  key={index}
                                  disablePadding
                                >
                                  <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                    <ListItemIcon>
                                      <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                      />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value.label} />
                                  </ListItemButton>
                                </ListItem>
                              );
                            })}
                          </List>
                          <Box pt={3}>
                            <Button 
                              variant="contained" 
                              color="default"
                              className={classes.noChoiceButton}
                              onClick={()=>handleValueClick(field, checked)}
                            >
                              Suivant
                            </Button>
                          </Box>
                        </>
                      }
                      { ! isChoice && ! multiple &&
                        <Box pt={3}>
                          <Button 
                            variant="contained" 
                            color="default"
                            className={classes.noChoiceButton}
                            onClick={()=>handleValueClick(field, null)}
                          >
                            Ignorer ce critère
                          </Button>
                        </Box>
                      }
                    </Box>
                  )
                }
              })
            }
            { selectedResource &&
              <Box className={classes.criteriaChevronContainer}>
                <ChevronRightIcon
                  className={classes.criteriaChevron} 
                  onClick={() => handleClickRightCriteriaChevron()}
                />
              </Box>
            }
          </Box>
        </>
      }
      <Box ref={resultsRef}>
        { searchStep === getSearchStep('results') &&
          <Box> 
            { results && 
              <Box>
                <hr />
                { results.length === 0 &&
                  <Box p={3}>
                    <p>Aucun résultat : Veuillez modifier vos critères de recherche.</p>
                  </Box>
                }
                { results.length > 0 &&
                  <h2>Résultats ({results.length}) :</h2>
                }
                <List sx={{/* width: '100%', maxWidth: 360, bgcolor: 'background.paper' */}}>
                  { results.map((result, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>
                          <WorkIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={result.id} 
                        secondary={<>{result.hasGenders}<br />{result.hasDegreeLevel}</>}
                      />
                    </ListItem>
                  )) }
                </List>
              </Box>
            }
          </Box>
        }
        { searchStep !== getSearchStep('start') &&
          <Box pt={4}>
            <hr />
            <Box pt={3}>
              <Button 
                variant="contained" 
                color="default"
                className={classes.noChoiceButton}
                onClick={()=>handleNewSearchClick()}
              >
                Nouvelle recherche
              </Button>
            </Box>
          </Box>
        }
      </Box>
    </Container>
  );
};

export default Search;
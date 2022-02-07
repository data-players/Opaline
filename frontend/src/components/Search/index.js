import React, { useRef, useState, useEffect } from 'react';
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
import searchConfig from './searchConfig.json';
import AppBar from '../../containers/AppBar';


const Search = ({
  addBooleanField,
  fetchContainer,
  fieldValues,
  goToSearchField,
  setResults,
  loading,
  resourceValues,
  searchIndex,
  results,
  resultsByStructure
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
  const [checked, setChecked] = useState([]);
  const [textFieldValue, setTextFieldValue] = useState('');
  
  let selectedFieldValues = null
    if (selectedField?.name) {
    selectedFieldValues = fieldValues[selectedField.name];
  }

  // Clone nested object
  const rootContainer = {...searchConfig[0], fields:[...searchConfig[0].fields]};

  console.log('>> selectedResource:', selectedResource);
  console.log('>> searchStep:', searchStep);
  console.log('>> searchFields:', searchFields);
  console.log('>> selectedField:', selectedField);
  console.log('>> selectedFieldValues:', selectedFieldValues);
  console.log('>> selectedValues:', [...selectedValues]);
  console.log('>> checked:', checked);
  console.log('>> textFieldValue:', textFieldValue);
  console.log('>+ resourceValues:', resourceValues);
  console.log('>+ fieldValues:', fieldValues);
  console.log('>+ searchIndex:', searchIndex);
  console.log('>+ results', results);

  
  const handleNewSearchClick = () => {
    console.log('----------START----------');
    setSearchStep(getSearchStep('start'));
    setSelectedField(null);
    setSelectedValues([]);
    setResults([]);
    setChecked([]);
    setTextFieldValue(null);
    setSelectedResource(rootContainer);
    setSearchFields(rootContainer.fields);
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
    if (field !== selectedField) {
      setChecked([]);
      setTextFieldValue('');
      setSelectedField(field);
      if (searchFields.findIndex(sf => sf.name === field.name) > 0) {
        setSearchStep(getSearchStep('field'));
      } else {
        setSearchStep(getSearchStep('start'));
      }
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
              if (selectedValue.field === field) {
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

  const getResults = async () => {
    if (!resourceValues) {
      return;
    }
    let results = resourceValues[rootContainer.slug];
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
    getData(rootContainer.fields);
    handleNewSearchClick();
  }, []);
  
  useEffect( () => { 
    if(searchIndex < 0 ) {
      goToSearchField(0);
    } else if(searchIndex > searchFields.length-1 ) {
      goToSearchField(searchFields.length);
      handleResultsStepClick();
    } else {
      displayField(searchIndex);  
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
      { ! loading &&
        <Container className={classes.mainContainer} maxWidth="sm">
          { searchStep !== getSearchStep('results') &&
            <>
              { selectedField &&
                <Typography component="h2" variant="h2" className={classes.stepTitle}><FormatedTitle title={selectedField.title}/></Typography>
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
                                        color={selectedValues.find(sv => (sv.value[matchField] === value[matchField])) ? "primary" : "default"}
                                        onClick={()=>handleValueClick(field, value)}
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
                              <Box className={classes.nextButtonContainer}>
                                <Button 
                                  variant="contained" 
                                  color="secondary"
                                  className={classes.nextButton}
                                  onClick={()=>handleValueClick(field, checked)}
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
          <Box ref={resultsRef}>
            { searchStep === getSearchStep('results') &&
              <Box> 
                { results && 
                  <Box>
                    { results.length === 0 &&
                      <Box p={3}>
                        <p>Aucun résultat : Veuillez modifier vos critères de recherche.</p>
                      </Box>
                    }
                    <List>
                      { resultsByStructure.map((result, index) => (
                        <ListItem button key={index} component={Link} to={`/structures/${getSlugFromContainerUrl('organizations', result.id)}`}>
                          <ListItemButton>
                            <ListItemAvatar>
                              <Avatar>
                                <WorkIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                              primary={result.label} 
                              secondary={result.id}
                            />
                          </ListItemButton>
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
import React, { useRef, useState, useEffect } from 'react';

import { Avatar, Box, Button, Chip, Container } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import OrganizationIcon from '@material-ui/icons/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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
  
  const searchSteps = ['start', 'field', 'results'];
  const [searchStep, setSearchStep] = useState(0);
  const [selectedResource, setSelectedResource] = useState();
  const [searchFields, setSearchFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [results, setResults] = useState();
  
  let selectedFieldValues = null
    if (selectedField?.name) {
    selectedFieldValues = fieldValues[selectedField.name];
  }
  
  console.log('>> selectedResource:', selectedResource);
  console.log('>> searchStep:', searchStep);
  console.log('>> searchFields:', searchFields);
  console.log('>> selectedField:', selectedField);
  console.log('>> selectedFieldValues:', selectedFieldValues);
  console.log('>> selectedValues:', selectedValues);
  console.log('>> results', results);
  console.log('>+ resourceValues:', resourceValues);
  console.log('>+ fieldValues:', fieldValues);
  
  const getSearchStep = (step) => {
    return searchSteps.indexOf(step)
  }
  
  const handleNewSearchClick = () => {
    setSearchStep(getSearchStep('start'));
    setSearchFields([]);
    setSelectedField(null);
    setSelectedValues([]);
    setResults(null);
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
    const fieldIndex = resource.fields.findIndex(field => field.type === selectedField.type);
    if (fieldIndex === -1) {
      return; 
    }
    if (! backward ) {
      if (fieldIndex >= (Object.keys(resource.fields).length - 1)) {
        handleResultsStepClick();
        return; 
      }
      return Object.values(resource.fields)[fieldIndex + 1];
    } else {
      if (fieldIndex === 0) {
        return; 
      }
      return Object.values(resource.fields)[fieldIndex - 1];
    }
  }
  
  const handleClickLeftCriteriaChevron = () => {
    goToNextField(selectedResource, selectedField, true);
  }
  const handleClickRightCriteriaChevron = () => {
    goToNextField(selectedResource, selectedField);
  }
  
  const setChosenField = (field, value, replace=false) => {
    // no field to add if default choice
    if (value.choice !== 'default') {
      // replace choice field and chosen field if replace needed
      searchFields.splice(searchFields.indexOf(field)+1 , replace?1:0, {...value, type: 'chosen'})
      // delete old selected value for chosen field
      if(replace) {
        const chosenIndex = selectedValues.indexOf(selectedValues.find(sv=>sv.field.name===field.name));
        selectedValues.splice(chosenIndex-1, 1);
        setSelectedValues(selectedValues);
      }
      setSearchFields(searchFields);
    }
  }

  const handleFieldClick = (field) => {
    setSearchStep(getSearchStep('field'));
    if (field !== selectedField) {
      setSelectedField(field);
    }
  };
  
  const handleValueClick = (field, value) => {
    if (value) {
      if (! value.id) {
        value.id = value.name
      }
      const currentValueForField = selectedValues.find(selectedValue => selectedValue.field === field);
      if (! currentValueForField) {
        selectedValues.push({
          field: field,
          value: value
        })
        setSelectedValues([...selectedValues]);
        if (field.type === 'choice') {
          setChosenField(field, value)
        }
      } else {
        if (currentValueForField.value.id === value.id) {
          goToNextField(selectedResource, field);
          return;
        } else {
          if (field.type === 'choice') {
            setChosenField(field, value, true)
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
    console.log('--1', results);   
    selectedValues.forEach(selectedValue => {
      if (selectedValue.field.type !== 'choice') {
        results = results.filter(result => {
          // single value to array :
          let resultValues = [].concat(result[selectedValue.field.name])
          console.log('--2', selectedValue.value.id);
          console.log('--3', resultValues);
          return resultValues.includes(selectedValue.value.id);
        })
      }
    })
    console.log('--9', results);   
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
        case 'choice':
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
    setSelectedResource(rootContainer);
    setSearchFields(rootContainer.fields);
    goToNextField(rootContainer, null);
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
                  if (selectedValue.field.type !== 'choice') {
                    const label = selectedValue.field.type!=='boolean'
                      ? selectedValue.value.label
                      : selectedValue.field.label + ' : ' + selectedValue.value.label
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
                if (field.type !== 'choice') { return(
                  <Box key={index} className={classes.criteriaContainer}>
                    <Box className={ (selectedFieldValues?.length > 6) ? classes.manyCriterias : null }>
                      {
                        selectedFieldValues?.map((value, index) => (
                          <Box pt={2} key={index}>
                            <Button 
                              variant="contained" 
                              color={selectedValues.find(selectedValue => (selectedValue.value.id === value.id)) ? "primary" : "secondary"}
                              onClick={()=>handleValueClick(field, value)}
                            >
                              {value.label}
                            </Button>
                          </Box>
                        ))
                      }
                    </Box>
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
                  </Box>
                )} else { 
                  return(
                  <Box key={index} className={classes.criteriaContainer}>
                    <Box className={ (selectedFieldValues?.length > 6) ? classes.manyCriterias : null }>
                      {
                        selectedField.fields.map((value, index) => (
                          <Box pt={2} key={index}>
                            <Button 
                              variant="contained" 
                              color={selectedValues.find(selectedValue => (selectedValue.value.id === value.id)) ? "primary" : "secondary"}
                              onClick={()=>handleValueClick(field, value)}
                            >
                              {value.label}
                            </Button>
                          </Box>
                        ))
                      }
                    </Box>
                  </Box>
                )}
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
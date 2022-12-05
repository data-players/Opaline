import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Container, TextField, Typography } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { getSlugFromContainerUrl } from '../../selectors/urls';
import SanitizedHTML from '../SanitizedHTML';
import useStyles from './useStyle'
import AppBar from '../../containers/AppBar';
import Loading from '../Loading';
import Icon from './components/Icon';
import NextButton from './components/NextButton';
import ResultCard from './components/ResultCard';
import ResultStepTitle from './components/ResultStepTitle';

import { useMatomo } from '@datapunt/matomo-tracker-react'


const Search = ({
  fieldValues,
  goToSearchField,
  setResults,
  setMinimalDelay,
  setSearchFields,
  setSelectedValues,
  loadData,
  loadFields,
  loading,
  message,
  resourceValues,
  results,
  resultsByStructure,
  searchFields,
  searchIndex,
  selectedValues,
  setMessage,
  startOfLoading
}) => {

  const classes = useStyles();

  const [isReady, setIsReady] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [checked, setChecked] = useState([]);
  const [textFieldValue, setTextFieldValue] = useState('');

  const { trackPageView, trackEvent, trackSiteSearch } = useMatomo()

  let selectedFieldValues = null;
  if (selectedField?.name) {
    selectedFieldValues = fieldValues[selectedField.name];
  }

  const isNewSearch = searchIndex === -1
  const isResultsStep = searchIndex === searchFields.length

  const handleNewSearchClick = () => {
    setSelectedField(null);
    setSelectedValues([]);
    setResults([]);
    setChecked([]);
    setTextFieldValue(null);
    setSearchFields([]);
    goToSearchField(0);
    displayField(0);
    setMessage('');
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

    if(field){
          // console.log('trackPageView',field);
      trackPageView(
        {
          documentTitle: `recherche : ${field.label||field.name}`
        }
      )
    }
    if (! field || ! selectedField || field.name !== selectedField.name) {
      setChecked([]);
      setTextFieldValue('');
      setSelectedField(field);
      const currentSelectedValue = selectedValues.find(sv => sv.field.name === field.name);
      if (currentSelectedValue) {
        if (field.multiple) {
          setChecked(currentSelectedValue.value);
        }
        if (field.type === 'range' || field.type === 'location') {
          setTextFieldValue(currentSelectedValue.value.id);
        }
      }
    }
  };

  const handleTextFieldChange = (evt) => {
    setTextFieldValue(evt.target.value);
  }

  const handleClickValue = (field, value) => {
    setMessage('');

    // Track click on button
    // trackEvent({ category: `search-${selectedField.name}`, action: 'click-event' })

    if (value) {
      if (field.type === 'field-choice') {
        value.id = value.name
      }
      const currentValueForField = selectedValues.find(selectedValue => selectedValue.field.name === field.name);
      if (! currentValueForField) {
        // console.log('NORMAL WAY');
        if (field.type !== 'chosen-field') {
          selectedValues.push({ field: field, value: value });
        } else {
          // insert chosen-field just after parent field-choice
          const choiceFieldIndex = selectedValues.findIndex(sv=> sv.field.name === field.parent);
          selectedValues.splice(choiceFieldIndex+1, 0, { field: field, value: value });
        }
        // console.log('ACTION selectedValues',field,value);
        const matomoValue= (Array.isArray(value)?value:[value]).map(v=>v.id);
        // console.log('matomoValue',JSON.stringify(matomoValue));
        // console.log('trackEvent',field);
        trackEvent({ category: `next`, action:field.label||field.name,name:JSON.stringify(matomoValue)})
        setSelectedValues([...selectedValues]);
        if (field.type === 'field-choice') {
          setChosenField(field, value)
        }
      } else {
        console.log('ANY WAY?');
        if (currentValueForField.value.id === value.id && ! Array.isArray(currentValueForField.value)) {
          goToNextField(field);
          // console.log('ACTION next Page');
          return;
        } else {
          // console.log('ACTION ?',field,value,selectedValues);
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
    }else {
      // console.log('field?',field);
      trackEvent({ category: `next`, action:field.label||field.name,name:'undefined'})
    }
    // console.log('FINAL GO NEXT');
    goToNextField(field);
  };

  const findResults = async () => {
    if (!resourceValues) {
      return;
    }
    // console.log('findResults',selectedValues);
    let results = [resourceValues['programs'],resourceValues['structures']].flat();
    let searchSynthesys={};
    selectedValues.forEach(sv => {
      if (sv.field.type !== 'field-choice' || sv.value.type === 'no-choice') {
        switch (sv.field.type) {
          case 'range':
            const minFieldName = sv.field.min;
            const maxFieldName = sv.field.max;
            const value = sv.value.id;
            searchSynthesys[sv.field.label||sv.field.name]=value;
            results = results.filter(result => {
              const minBoundOk = ! result[minFieldName] || result[minFieldName] <= value;
              const maxBoundOk = ! result[maxFieldName] || result[maxFieldName] >= value;
              return minBoundOk && maxBoundOk;
            })
          break;
          case 'location':
            searchSynthesys[sv.field.label||sv.field.name]=sv.value.id;
            results = results.filter(result => {
              const structure = resourceValues['structures'].find(orga => orga['id'] === result["pair:offeredBy"]);
              let trainingSite = resourceValues['trainingSites']?.find(site => site['id'] === result["pair:offers"]);
              if ( ! trainingSite ) {
                trainingSite = structure;
              }
              if ( ! trainingSite
                || ! trainingSite['pair:hasLocation']
                || ! trainingSite['pair:hasLocation']['pair:hasPostalAddress']
                || ! trainingSite['pair:hasLocation']['pair:hasPostalAddress']['pair:addressZipCode']
              ) {
                return false
              }
              if (trainingSite['pair:hasLocation']['pair:hasPostalAddress']['pair:addressZipCode'].substring(0,2) === sv.value.id.substring(0,2)) {
                return true
              } else {
                return false
              }
            })
          break;
          default:
            let fieldName = sv.field.name;
            if (sv.value.type === 'no-choice') {
              fieldName = sv.value.name;
            }
            // single selected value to array :
            const values = [].concat(sv.value);
            // array of all selected ids for the current field
            const valueIds = values.map(v => v.id)
            searchSynthesys[sv.field.label||sv.field.name]=valueIds;
            results = results.filter(result => {
              // result kept if no value for the current field
              if (result[fieldName] === undefined && ! sv.field.required) {
                return true
              } else {
                // single value to array for the current field
                let resultValues = [].concat(result[fieldName])
                // check if at least one result value matches with one selected value
                let resultOk = false;
                resultValues.forEach(rv => {
                  if (sv.field.type === 'boolean') {
                    resultOk = true;
                    // only choice "true" is explicit
                    if (sv.value.id === true) {
                      resultOk = rv;
                    }
                  } else if (sv.value.type === 'no-choice') {
                    resultOk = rv;
                  } else {
                    if (valueIds.includes(rv)) {
                      resultOk = true;
                    }
                  }
                })
                return resultOk;
              }
            })
        }
      }
    })
    trackSiteSearch({ keyword: JSON.stringify(searchSynthesys),count:results.length})
    // console.log('trackSiteSearch');
    setResults(results);
  }

  useEffect( () => {
    setMinimalDelay(Date.now());
    loadData('configurations');
    loadData('structures');
    loadData('programs');
    loadData('trainingSites');
  }, [])

  useEffect( () => {
    if (resourceValues['configurations'] && loading) {
      loadFields()
    }
  }, [resourceValues])

  useEffect( () => {
    if (! loading && results.length === 0) {
      handleNewSearchClick();
    }
    if (! loading) {
      if (isNewSearch) {
        // Minimal delay
        let delay = 3000
        if (startOfLoading) {
          delay = delay - (Date.now() - startOfLoading);
          delay = delay < 0 ? 0 : delay;
        }
        setMinimalDelay(null);
        setTimeout(() => {
          setIsReady(true);
        }, delay);
      } else {
        setIsReady(true);
      }
    }
  }, [loading]);

  useEffect( () => {
    if ( searchFields.length > 0) {
      if(searchIndex < 0 ) {
        goToSearchField(0);
      } else if(searchIndex > searchFields.length-1 ) {
        goToSearchField(searchFields.length);
        setSelectedField(null);
        findResults();
      } else {
        displayField(searchIndex);
      }
    }
  }, [searchIndex]);

  // Track page view
  useEffect(() => {
    // console.log('trackPageView',selectedField);
    // trackPageView(
    //   // {
    //   //   documentTitle: `recherche/${selectedField.name}`
    //   // }
    // )
  })

  return (
    <>
      { ! isReady &&
        <Loading message={"Tout d'abord, <br/> faisons connaissance..."} />
      }
      { isReady &&
        <AppBar />
      }
      { isReady &&
        <Container className={classes.mainContainer} maxWidth="sm">
          { ! isResultsStep &&
            <>
              { selectedField &&
                <>
                  <Typography component="h2" variant="h2" className={classes.stepTitle}>
                    <SanitizedHTML text={selectedField.title} />
                  </Typography>
                  { selectedField.multiple && selectedField.multiple < 99 &&
                    <Typography component="div" className={classes.instructions}>
                      Vous pouvez cocher jusque {selectedField.multiple} cases
                    </Typography>
                  }
                  { message &&
                    <Typography component="div" className={classes.message}>
                      {message}
                    </Typography>
                  }
                </>
              }
              <Box pb={4} mt={-1} className={classes.criteriasContainer}>
                {
                  searchFields.filter(field => selectedField === field).map((field, index) => {

                    if (field.type === 'range' || field.type === 'location') {

                      return (
                        <Box key={index} className={classes.criteriaContainerText}>
                          <TextField
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={handleTextFieldChange}
                            value={textFieldValue}
                          />
                          <NextButton
                            field={field}
                            value={(isNaN(Number(textFieldValue)) || Number(textFieldValue) === 0) ? null : {id: textFieldValue}}
                            onClick={handleClickValue}
                          />
                        </Box>
                      )

                    } else {

                      const isChoice = field.type === 'field-choice';
                      const fieldsArray = isChoice ? selectedField.fields : selectedFieldValues;
                      const isMultiple = field.multiple && fieldsArray;
                      const matchField = isChoice ? 'name' : 'id';
                      const currentSelectedValue = selectedValues.find(sv => sv.field.name === field.name);
                      const currentSelectedValueExist = currentSelectedValue !== undefined;

                      const handleToggle = (value) => () => {
                        const currentIndex = checked.findIndex(c => c.id === value.id);
                        const newChecked = [...checked];

                        if (currentIndex === -1) {
                          if (field.multiple && field.multiple === newChecked.length) {
                            setMessage('Vous avez atteint le nombre de choix maximum.');
                            return;
                          } else {
                            newChecked.push(value);
                          }
                        } else {
                          setMessage('');
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
                                  let iconName = undefined;
                                  if (field.icons) {
                                    if (value.type !== 'no-choice') {
                                      className = `${className} ${classes.iconButton}`;
                                    }
                                    if (field.type === 'field-choice') {
                                      iconName = field.icons[value.name];
                                    } else {
                                      iconName = field.icons[getSlugFromContainerUrl(value.id)];
                                    }
                                  }
                                  if (selectedValues.find(sv =>(sv.value[matchField] === value[matchField])) !== undefined) {
                                    className = `${className} ${classes.selectedValue}`;
                                  }
                                  return (
                                    <Box pt={2} key={index} className={className}>
                                      <Button onClick={()=>handleClickValue(field, value)}>
                                        <Icon name={iconName} />
                                        <span className={classes.labelButton}>{value.label}</span>
                                      </Button>
                                    </Box>
                                  )
                                })
                              }
                            </Box>
                          }
                          { isMultiple &&
                            <Box key={index} className={classes.criteriaContainerMultiple}>
                              <List>
                                { fieldsArray.map((value, index) => {
                                  const labelId = `checkbox-list-label-${value.id.substring(value.id.lastIndexOf('/')+1)}`;
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
                            </Box>
                          }
                          { ( isMultiple || currentSelectedValueExist || ! field.required ) &&
                            <NextButton
                              field= {field}
                              value= {
                                isMultiple
                                  ? checked
                                  : currentSelectedValueExist
                                    ? currentSelectedValue.value
                                    : null
                              }
                              onClick={handleClickValue}
                            />
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
                          to={`/structures/${getSlugFromContainerUrl(result.id)}`}
                          className={classes.resultListItem}
                        >
                          <ResultCard
                            id={result.id}
                            label={result.label}
                            depictedBy={result["pair:depictedBy"]}
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

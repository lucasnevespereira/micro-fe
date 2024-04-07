import {ref, toValue} from 'vue';
import axios from 'axios';
export const useFetchJobs = () => {
    const jobs = ref();
    const isLoading = ref(false);
    const error = ref(null)
    const url = `http://localhost:3001/api/search`;

    const triggerSearch = async (keyword) => {
        if (!keyword) return {jobs, error, isLoading};
        try {
            isLoading.value = true;
            const body = getJobsQuery(toValue(keyword));
            const response = await axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data) {
                jobs.value = response.data.hits.hits;
            }
        } catch (e) {
            error.value = e;
        } finally {
            isLoading.value = false;
        }
    }

    return {triggerSearch, jobs, error, isLoading};
}
const getJobsQuery = (keyword) => {
    return {
        "_source": {
            "excludes": [
                "titrePoste_embedding"
            ]
        },
        "query": {
            "bool": {
                "must": [
                    {
                        "neural": {
                            "titrePoste_embedding": {
                                "query_text": keyword,
                                "k": 100,
                                "filter": {
                                    "bool": {
                                        "must": [
                                            {
                                                "terms": {
                                                    "statut": [
                                                        "ONLINE",
                                                        "ARCHIVED_SEARCHABLE"
                                                    ]
                                                }
                                            },
                                            {
                                                "term": {
                                                    "searchable": true
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "contrat.typeContrat.code": [
                                                        1,
                                                        2
                                                    ]
                                                }
                                            },
                                            {
                                                "terms": {
                                                    "localisation.departement.region.isoCode": [
                                                        "FR-J"
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                ],
                "should": [
                    {
                        "script_score": {
                            "query": {
                                "neural": {
                                    "titrePoste_embedding": {
                                        "query_text": keyword,
                                        "k": 100
                                    }
                                }
                            },
                            "script": {
                                "source": "_score * 6"
                            }
                        }
                    },
                    {
                        "script_score": {
                            "query": {
                                "match": {
                                    "titrePoste": keyword
                                }
                            },
                            "script": {
                                "source": "_score * 1.7"
                            }
                        }
                    }
                ]
            }
        }
    };
}

export default useFetchJobs;
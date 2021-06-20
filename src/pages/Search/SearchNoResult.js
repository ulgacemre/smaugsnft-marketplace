import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../components/Layout'
import SingleInput from '../../components/Input/SingleInput';

import imgHero from '../../assets/images/search/no-result-bg.png'
import ScrollView from '../../components/ScrollView';
import { dataExploreMore } from '../../FakeData/Search';

import axios from '../../utils/Api';
import Link from '../../components/Link';
import slugify from 'slugify';

function SearchNoResult() {

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const fetchCategories = () => {
        axios.get("Categories").then(({ data }) => {
            setCategories(data);
            setCategoriesLoading(false);
        }).catch((err) => {
            setCategories([]);
            setCategoriesLoading(false);
        });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Layout page="search-no-result">
            <div className="container content text-center">
                <img src={imgHero} className="w-100" />

                <div className="content-text mx-auto">
                    <h2>
                        Sorry, we couldn’t find any results for this search.
                    </h2>
                    <div className="text-caption neutral-4 mt-2">
                        Maybe give one of these a try?
                    </div>
                    <div className="search-input-container mt-4 mx-auto">
                        <SingleInput
                            placeholder="Enter your search"
                            icon="arrow-right"
                        />
                    </div>
                </div>

                <div className="">
                    <div className="text-body-1-bold mb-5">
                        Explore more
                    </div>
                    <ScrollView className="scrollview-items">
                        <div className="text-left d-flex w-100">
                           {/*
                            {categories.map((category, idx) => (
                                <Link href={"/collection/" + slugify(category.title).toLowerCase()}>
                                    <div className={"explore-more-item " + (idx === 0 ? "" : "ml-32")} style={{ cursor: "pointer", color: "white" }}>
                                        <div className="d-flex">
                                            <img src={dataExploreMore[idx].image} />
                                            <div className="ml-12 text-left mt-auto mb-auto">
                                                <div className="text-body-2-bold">
                                                    {category.title}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                           */}
                        </div>
                    </ScrollView>
                </div>
            </div>
        </Layout>
    );
}

export default SearchNoResult;

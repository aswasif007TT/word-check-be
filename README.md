## Description

NestJS API for checking if a sentence contains non-english words.

## Installation

Recommended way is to pull the word-check-localdev repository to run this project.

## Endpoints

This API contains one endpoint `/check-sentence` which takes a sentence and returns the list of non-english words in it.

## Architecture

A prefix-tree is built from the list of english words found in [this url](https://raw.githubusercontent.com/jeremy-rifkin/Wordlist/master/master.txt) and stored in cache. This is done right after launching the server. Then the `/check-sentence` retrieves the prefix-tree from the cache and tests every word from the input sentence against the prefix-tree.

An async task runs every hour to keep the prefix-tree updated for any change in the word-list.

module.exports = {
  searchForm: {
    input: {
      value: '',
      placeholder: 'find your favorites music !'
    },
    select: [
      {value: '', text: '*category*', selected: 'selected'},
      {value: 'name', text: 'track name'},
      {value: 'searchname', text: 'search a track by name'},
      {value: 'album_name', text: 'album name'},
      {value: 'artist_name', text: 'artist name'},
      {value: 'tags', text: 'tag (AND)'},
      {value: 'fuzzytags', text: 'tag (OR)'},
      {value: 'search', text: 'free text'}
    ]
  },
  searchResult: {
    title: '',
    list: []
  },
  playlist: {
    repeat: false,
    list: []
  },
  audioPlayer: null,
  histories: null
}

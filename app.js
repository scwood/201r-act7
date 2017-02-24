angular.module('News', ['ui.router'])
  .factory('postFactory', postFactory)
  .controller('MainCtrl', MainCtrl)
  .controller('PostCtrl', PostCtrl)
  .config(config);

function postFactory() {
  var factory = {
    posts: []
  };
  return factory;
}

MainCtrl.$inject = ['$scope', 'postFactory'];
function MainCtrl($scope, postFactory) {
  $scope.posts = postFactory.posts;

  $scope.addPost = function () {
    if($scope.formContent === '') {
      return;
    }
    $scope.posts.push({
      title: $scope.formContent,
      upvotes: 0,
      comments: []
    });
    $scope.title = '';
  };

  $scope.incrementUpvotes = function (post) {
    post.upvotes += 1;
  };
}

PostCtrl.$inject = ['$scope', '$stateParams', 'postFactory']
function PostCtrl($scope, $stateParams, postFactory) {
  $scope.post = postFactory.posts[$stateParams.id];

  $scope.addComment = function(){
    if($scope.body === '') { return; }
    $scope.post.comments.push({
      body: $scope.body,
      upvotes: 0
    });
    $scope.body = '';
  };

  $scope.incrementUpvotes = function (comment) {
    comment.upvotes += 1; 
  };
}

config.$inject = ['$stateProvider', '$urlRouterProvider'];
function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostCtrl'
    });
  $urlRouterProvider.otherwise('home');
}

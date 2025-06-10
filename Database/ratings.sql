-- Types
CREATE TYPE TextCriterionValueType AS TABLE
(
   ValueInt INT,
   ValueName VARCHAR(50)
);
GO

-- Helper functions
create or alter function ContainsTextCriterionDuplicate
(
  @textCriterionValues TextCriterionValueType readonly
)
returns bit
AS 
BEGIN
   DECLARE @valueInt INT;
   DECLARE @valueName VARCHAR(50)
   DECLARE criteriaCursor CURSOR FOR
   SELECT ValueInt, ValueName FROM @textCriterionValues;

   OPEN criteriaCursor;

   FETCH NEXT FROM criteriaCursor
	INTO @valueInt, @valueName;

   WHILE @@FETCH_STATUS = 0
   BEGIN
      DECLARE @valueIntCount INT  = 0;
	  DECLARE @valueNameCount INT = 0;
	  SELECT @valueIntCount = COUNT(ValueInt) FROM @textCriterionValues WHERE ValueInt =  @valueInt;
	  SELECT @valueNameCount = COUNT(ValueName) FROM @textCriterionValues WHERE ValueName = @valueName;

	  IF @valueIntCount > 1
	  BEGIN
		 CLOSE criteriaCursor;
		 DEALLOCATE criteriaCursor;
	     RETURN 1;
	  END

	  IF @valueNameCount > 1
	  BEGIN
		 CLOSE criteriaCursor;
		 DEALLOCATE criteriaCursor;
	     RETURN 1;
	  END

	  FETCH NEXT FROM criteriaCursor INTO @valueInt, @valueName;
   END

   CLOSE criteriaCursor;
   DEALLOCATE criteriaCursor;
   RETURN 0;
END
GO

CREATE OR ALTER FUNCTION SplitToChars(@varcharInput VARCHAR(50))
RETURNS @charsTable TABLE
(
   SplittedChar VARCHAR(1)
)
AS
BEGIN
	DECLARE @index INT = 1;
	DECLARE @varcharLength INT;
	DECLARE @currentChar VARCHAR(1);
	SELECT @varcharLength = LEN(@varcharInput);

	WHILE @index <= @varcharLength
	BEGIN
		SELECT @currentChar = SUBSTRING(@varcharInput, @index, 1);
		INSERT INTO @charsTable(SplittedChar) VALUES (@currentChar);
		SET @index = @index + 1;
	END
	RETURN
END

CREATE OR ALTER FUNCTION RemoveCharacter(@varcharInput VARCHAR(50), @characterToRemove VARCHAR(1))
RETURNS VARCHAR(50)
AS
BEGIN
DECLARE @splittedChars TABLE(SplittedChar VARCHAR(1));
DECLARE @characterRemoved TABLE(SplittedChar VARCHAR(1));
DECLARE @concatResult VARCHAR(50);
INSERT INTO @splittedChars
SELECT SplittedChar FROM SplitToChars(@varcharInput);
INSERT INTO @characterRemoved 
SELECT SplittedChar FROM @splittedChars WHERE SplittedChar != ' ';
SELECT @concatResult = STRING_AGG(SplittedChar, '') FROM @characterRemoved;
RETURN @concatResult;
END
GO

-- Create tables
create table [dbo].[User]
(
   [Id] bigint identity(1,1) not null primary key,
   [UserName] varchar(50) not null,
   [Password] varchar(MAX) not null,
   [FirstName] varchar(50),
   [LastName] varchar(50),
   CONSTRAINT UniqueUser UNIQUE(UserName)
);
GO

create table [dbo].[Client]
(
   [Id] bigint identity(1,1) not null primary key,
   [Name] varchar(50) not null,
   [Street] varchar(50) not null,
   [City] varchar(50) not null,
   [PostalCode] varchar(10) not null,
   [Country] varchar(50) not null,
   [UserId] bigint not null,
   Foreign Key (UserId) References [dbo].[User](Id),
   CONSTRAINT UniqueClient UNIQUE(Name)
);
GO

create table [dbo].[RatingCriterion]
(
  [Id] bigint identity(1,1) not null primary key, 
  [ClientId] bigint not null,
  [CriterionName] varchar(50) not null
  Foreign Key (ClientId) References  Client(Id)
);
GO

create table [dbo].[Rating]
(
  [Id] bigint identity(1,1) not null primary key,
  [UserId] bigint not null,
  [RatingCriterionId] bigint not null,
  [DateOfRating] datetime not null,
  Foreign Key (UserId) References [User](Id),
  Foreign Key (RatingCriterionId) References RatingCriterion(Id)
);
GO

create table [dbo].[NumberRangeCriterion]
(
   [Id] bigint not null primary key,
   [MinValue] int not null,
   [MaxValue] int not null,
   [BestValue] int not null,
   [WorstValue] int not null,
   Foreign Key (Id) References RatingCriterion(Id)
);
GO

create table [dbo].[FloatRangeCriterion]
(
   [Id] bigint not null primary key,
   [MinValue] float not null,
   [MaxValue] float not null,
   [BestValue] float not null,
   [WorstValue] float not null,
   Foreign Key (Id) References RatingCriterion(Id)
);
GO

create table [dbo].[TextValueCriterion]
(
   [Id] bigint not null primary key,
   [BestValue] int not null,
   [WorstValue] int not null,
   [MinValue] int not null,
   [MaxValue] int not null,
   Foreign Key (Id) References RatingCriterion(Id)
);
GO

create table [dbo].[TextValue]
(
  [Id] bigint identity(1,1) not null primary key,
  [TextValueCriterionId] bigint not null,
  [ValueName] varchar(50) not null,
  [ValueInt] int not null,
  Foreign Key (TextValueCriterionId) References TextValueCriterion(Id)
);
GO

create table [dbo].[CommentCriterion]
(
    [Id] bigint not null primary key,
	Foreign Key (Id) References RatingCriterion(Id)
);
GO

create table [dbo].[DocumentCriterion]
(
    [Id] bigint not null primary key,
	Foreign Key (Id) References RatingCriterion(Id)
);
GO

create table [dbo].[NumberRangeRating]
(
    [Id] bigint not null primary key,
	[RatingValue] int not null,
	Foreign Key (Id) References Rating(Id)
);
GO

create table [dbo].[FloatRangeRating]
(
    [Id] bigint not null primary key,
	[RatingValue] float not null,
	Foreign Key (Id) References Rating(Id)
);
GO

create table [dbo].[TextValueRating]
(
    [Id] bigint not null primary key,
	[TextValueInt] int not null,
	Foreign Key (Id) References Rating(Id)
);
GO

create table [dbo].[CommentRating]
(
    [Id] bigint not null primary key,
	[Comment] varchar(max) not null,
	Foreign Key (Id) References Rating(Id)
);
GO

create table [dbo].[DocumentRating]
(
    [Id] bigint not null primary key,
	[DocumentName] varchar(max) not null,
	[DocumentData] varbinary(max) not null,
	Foreign Key (Id) References Rating(Id)
);
GO

create table [dbo].[DeletedRating]
(
  [Id] bigint not null primary key,
  [RatingCriterionId] bigint not null,
  [DateOfRating] datetime not null,
  Foreign Key (RatingCriterionId) References RatingCriterion(Id)
);
GO

create table [dbo].[DeletedNumberRangeRating]
(
    [Id] bigint not null primary key,
	[RatingValue] int not null,
	Foreign Key (Id) References DeletedRating(Id)
);
GO

create table [dbo].[DeletedFloatRangeRating]
(
    [Id] bigint not null primary key,
	[RatingValue] float not null,
	Foreign Key (Id) References DeletedRating(Id)
);
GO

create table [dbo].[DeletedTextValueRating]
(
    [Id] bigint not null primary key,
	[TextValueInt] int not null,
	Foreign Key (Id) References DeletedRating(Id)
);
GO

create table [dbo].[DeletedCommentRating]
(
    [Id] bigint not null primary key,
	[Comment] varchar(max) not null,
	Foreign Key (Id) References DeletedRating(Id)
);
GO

create table [dbo].[DeletedDocumentRating]
(
    [Id] bigint not null primary key,
	[DocumentName] varchar(max) not null,
	[DocumentData] varbinary(max) not null,
	Foreign Key (Id) References DeletedRating(Id)
);
GO

-- Stored procedures
-- Criteria stored procedures
CREATE OR ALTER PROCEDURE CreateNewNumberRangeCriterion
@clientId BIGINT,
@criterionName VARCHAR(50),
@minValue INT,
@maxValue INT,
@worstValue INT,
@bestValue INT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @clientCount INT;
		SELECT @clientCount = COUNT(Id) FROM Client WHERE Id = @clientId;

		-- Check if the client exists
		IF @clientCount = 0
		BEGIN
		    THROW 51000, 'The client does not exist!', 1;
		END

		DECLARE @criterionCount INT;
		SELECT @criterionCount = COUNT(Id) FROM RatingCriterion WHERE ClientId = @clientId AND CriterionName = @criterionName;

		-- Check if the criterion already exists
		IF @criterionCount > 0
		BEGIN
		    THROW 51000, 'The criterion already exists!', 1;
		END

		IF @minValue >= @maxValue
		BEGIN
		    THROW 51000, 'The minimal value cannot be larger or equal to the maximal value!', 1;
		END

		IF NOT(@minValue = @worstValue OR @minValue = @bestValue)
		BEGIN
		    THROW 51000, 'The minimal value has to equal either to the worst value or to the best value!', 1;
		END

		IF NOT(@maxValue = @worstValue OR @maxValue = @bestValue)
		BEGIN
		    THROW 51000, 'The max value has to equal either to the worst value or to the best value!', 1;
		END

		IF @bestValue = @worstValue
		BEGIN 
		    THROW 51000, 'The best value and the worst value cannot be equal!', 1;
		END

		INSERT INTO RatingCriterion(ClientId, CriterionName) VALUES (@clientId, @criterionName);
		DECLARE @insertedCriterionId BIGINT;
		SELECT @insertedCriterionId = SCOPE_IDENTITY();
		INSERT INTO NumberRangeCriterion(Id, MinValue, MaxValue, WorstValue, BestValue) 
		VALUES(@insertedCriterionId, @minValue, @maxValue, @worstValue, @bestValue);
		COMMIT;
	    RETURN 0;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE CreateNewFloatRangeCriterion
@clientId BIGINT,
@criterionName VARCHAR(50),
@minValue FLOAT,
@maxValue FLOAT,
@worstValue FLOAT,
@bestValue FLOAT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @clientCount INT;
		SELECT @clientCount = COUNT(Id) FROM Client WHERE Id = @clientId;

		-- Check if the client exists
		IF @clientCount = 0
		BEGIN
		    THROW 51000, 'The client does not exist!', 1;
		END

		DECLARE @criterionCount INT;
		SELECT @criterionCount = COUNT(Id) FROM RatingCriterion WHERE ClientId = @clientId AND CriterionName = @criterionName;

		-- Check if the criterion already exists
		IF @criterionCount > 0
		BEGIN
		    THROW 51000, 'The criterion already exists!', 1;
		END

		IF @minValue >= @maxValue
		BEGIN
		    THROW 51000, 'The minimal value cannot be larger or equal to the maximal value!', 1;
		END

		IF NOT(@minValue = @worstValue OR @minValue = @bestValue)
		BEGIN
		    THROW 51000, 'The minimal value has to equal either to the worst value or to the best value!', 1;
		END

		IF NOT(@maxValue = @worstValue OR @maxValue = @bestValue)
		BEGIN
		    THROW 51000, 'The max value has to equal either to the worst value or to the best value!', 1;
		END

		IF @bestValue = @worstValue
		BEGIN 
		    THROW 51000, 'The best value and the worst value cannot be equal!', 1;
		END

		INSERT INTO RatingCriterion(ClientId, CriterionName) VALUES (@clientId, @criterionName);
		DECLARE @insertedCriterionId BIGINT;
		SELECT @insertedCriterionId = SCOPE_IDENTITY();
		INSERT INTO FloatRangeCriterion(Id, MinValue, MaxValue, WorstValue, BestValue) 
		VALUES(@insertedCriterionId, @minValue, @maxValue, @worstValue, @bestValue);
		COMMIT;
	    RETURN 0;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE CreateNewCommentCriterion
@clientId BIGINT,
@criterionName VARCHAR(50)
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @clientCount INT;
		SELECT @clientCount = COUNT(Id) FROM Client WHERE Id = @clientId;

		-- Check if the client exists
		IF @clientCount = 0
		BEGIN
		    THROW 51000, 'The client does not exist!', 1;
		END

		DECLARE @criterionCount INT;
		SELECT @criterionCount = COUNT(Id) FROM RatingCriterion WHERE ClientId = @clientId AND CriterionName = @criterionName;

		-- Check if the criterion already exists
		IF @criterionCount > 0
		BEGIN
		    THROW 51000, 'The criterion already exists!', 1;
		END

		INSERT INTO RatingCriterion(ClientId, CriterionName) VALUES (@clientId, @criterionName);
		DECLARE @insertedCriterionId BIGINT;
		SELECT @insertedCriterionId = SCOPE_IDENTITY();
		INSERT INTO CommentCriterion(Id) VALUES (@insertedCriterionId);
		COMMIT;
	    RETURN 0;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE CreateNewDocumentCriterion
@clientId BIGINT,
@criterionName VARCHAR(50)
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @clientCount INT;
		SELECT @clientCount = COUNT(Id) FROM Client WHERE Id = @clientId;

		-- Check if the client exists
		IF @clientCount = 0
		BEGIN
		    THROW 51000, 'The client does not exist!', 1;
		END

		DECLARE @criterionCount INT;
		SELECT @criterionCount = COUNT(Id) FROM RatingCriterion WHERE ClientId = @clientId AND CriterionName = @criterionName;

		-- Check if the criterion already exists
		IF @criterionCount > 0
		BEGIN
		    THROW 51000, 'The criterion already exists!', 1;
		END

		INSERT INTO RatingCriterion(ClientId, CriterionName) VALUES (@clientId, @criterionName);
		DECLARE @insertedCriterionId BIGINT;
		SELECT @insertedCriterionId = SCOPE_IDENTITY();
		INSERT INTO DocumentCriterion(Id) VALUES (@insertedCriterionId);
		COMMIT;
	    RETURN 0;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE CreateNewTextValueCriterion
@clientId BIGINT,
@criterionName VARCHAR(50),
@minValue INT,
@maxValue INT,
@worstValue INT,
@bestValue INT,
@textValues TextCriterionValueType READONLY
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @clientCount INT;
		SELECT @clientCount = COUNT(Id) FROM Client WHERE Id = @clientId;

		-- Check if the client exists
		IF @clientCount = 0
		BEGIN
		    THROW 51000, 'The client does not exist!', 1;
		END

		DECLARE @criterionCount INT;
		SELECT @criterionCount = COUNT(Id) FROM RatingCriterion WHERE ClientId = @clientId AND CriterionName = @criterionName;

		-- Check if the criterion already exists
		IF @criterionCount > 0
		BEGIN
		    THROW 51000, 'The criterion already exists!', 1;
		END

		if dbo.ContainsTextCriterionDuplicate(@textValues) = 1
		BEGIN
		    THROW 51000, 'The text values cannot contain duplicates!', 1;
		END

		IF @minValue >= @maxValue
		BEGIN
		    THROW 51000, 'The minimal value cannot be larger or equal to the maximal value!', 1;
		END

		IF NOT(@minValue = @worstValue OR @minValue = @bestValue)
		BEGIN
		    THROW 51000, 'The minimal value has to equal either to the worst value or to the best value!', 1;
		END

		IF NOT(@maxValue = @worstValue OR @maxValue = @bestValue)
		BEGIN
		    THROW 51000, 'The max value has to equal either to the worst value or to the best value!', 1;
		END

		IF @bestValue = @worstValue
		BEGIN 
		    THROW 51000, 'The best value and the worst value cannot be equal!', 1;
		END

		DECLARE @outOfRangeCount INT = 0;
		SELECT @outOfRangeCount = COUNT(ValueInt) FROM @textValues WHERE ValueInt < @minValue OR ValueInt > @maxValue;

		IF @outOfRangeCount > 0
		BEGIN
		    THROW 51000, 'The ordinal values of the text values were out of range!', 1;
		END

		INSERT INTO RatingCriterion(ClientId, CriterionName) VALUES (@clientId, @criterionName);
		DECLARE @insertedCriterionId BIGINT;
		SELECT @insertedCriterionId = SCOPE_IDENTITY();
		INSERT INTO TextValueCriterion(Id, MinValue, MaxValue, BestValue, WorstValue) 
		VALUES (@insertedCriterionId, @minValue, @maxValue, @bestValue, @worstValue);
		INSERT INTO TextValue(TextValueCriterionId, ValueInt, ValueName)
		SELECT TextValueCriterionId = @insertedCriterionId, ValueInt, ValueName from  @textValues;
		COMMIT;
	    RETURN 0;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

-- Rating stored procedures
CREATE OR ALTER PROCEDURE GetNumericRatingsByOffsetForCriterion
@criterionId BIGINT,
@offset INT,
@rowSize INT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;

		IF @offset < 0
		BEGIN
		    THROW 51000, 'The offset cannot be less than 0!', 1;
		END

		IF @rowSize <= 0
		BEGIN
		    THROW 51000, 'The rowSize cannot be less or equal to 0!', 1;
		END

		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, DateOfRating DATETIME,
		RatingValue INT);
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, DateOfRating, RatingValue)
		SELECT Id, RatingCriterionId, UserId, DateOfRating, RatingValue FROM NumberRangeRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, DateOfRating, RatingValue)
		SELECT Id, RatingCriterionId, -1, DateOfRating, RatingValue FROM DeletedNumberRangeRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC
		OFFSET @offset ROWS
		FETCH NEXT @rowSize ROWS ONLY;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetNumericRatingsByOffsetForCriterionExtended
@criterionId BIGINT,
@offset INT,
@rowSize INT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;

		IF @offset < 0
		BEGIN
		    THROW 51000, 'The offset cannot be less than 0!', 1;
		END

		IF @rowSize <= 0
		BEGIN
		    THROW 51000, 'The rowSize cannot be less or equal to 0!', 1;
		END

		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, UserName VARCHAR(50), DateOfRating DATETIME,
		RatingValue INT);
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, RatingValue)
		SELECT Id, RatingCriterionId, UserId, UserName, DateOfRating, RatingValue FROM NumberRangeRatingsViewExtended 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, RatingValue)
		SELECT Id, RatingCriterionId, -1, 'unkn', DateOfRating, RatingValue FROM DeletedNumberRangeRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC
		OFFSET @offset ROWS
		FETCH NEXT @rowSize ROWS ONLY;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetAllNumericRatingsForCriterionExtended
@criterionId BIGINT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, UserName VARCHAR(50), DateOfRating DATETIME,
		RatingValue INT);
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, RatingValue)
		SELECT Id, RatingCriterionId, UserId, UserName, DateOfRating, RatingValue FROM NumberRangeRatingsViewExtended 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, RatingValue)
		SELECT Id, RatingCriterionId, -1, 'unkn', DateOfRating, RatingValue FROM DeletedNumberRangeRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetFloatRatingsByOffsetForCriterion
@criterionId BIGINT,
@offset INT,
@rowSize INT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;

		IF @offset < 0
		BEGIN
		    THROW 51000, 'The offset cannot be less than 0!', 1;
		END

		IF @rowSize <= 0
		BEGIN
		    THROW 51000, 'The rowSize cannot be less or equal to 0!', 1;
		END

		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, DateOfRating DATETIME,
		RatingValue FLOAT);
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, DateOfRating, RatingValue)
		SELECT Id, RatingCriterionId, UserId, DateOfRating, RatingValue FROM FloatRangeRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, DateOfRating, RatingValue)
		SELECT Id, RatingCriterionId, -1, DateOfRating, RatingValue FROM DeletedFloatRangeRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC
		OFFSET @offset ROWS
		FETCH NEXT @rowSize ROWS ONLY;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetFloatRatingsByOffsetForCriterionExtended
@criterionId BIGINT,
@offset INT,
@rowSize INT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;

		IF @offset < 0
		BEGIN
		    THROW 51000, 'The offset cannot be less than 0!', 1;
		END

		IF @rowSize <= 0
		BEGIN
		    THROW 51000, 'The rowSize cannot be less or equal to 0!', 1;
		END

		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, UserName VARCHAR(50), DateOfRating DATETIME,
		RatingValue FLOAT);
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, RatingValue)
		SELECT Id, RatingCriterionId, UserId, UserName, DateOfRating, RatingValue FROM FloatRangeRatingsViewExtended 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, RatingValue)
		SELECT Id, RatingCriterionId, -1, 'unkn', DateOfRating, RatingValue FROM DeletedFloatRangeRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC
		OFFSET @offset ROWS
		FETCH NEXT @rowSize ROWS ONLY;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetAllFloatRatingsForCriterionExtended
@criterionId BIGINT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, UserName VARCHAR(50), DateOfRating DATETIME,
		RatingValue FLOAT);
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, RatingValue)
		SELECT Id, RatingCriterionId, UserId, UserName, DateOfRating, RatingValue FROM FloatRangeRatingsViewExtended 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, RatingValue)
		SELECT Id, RatingCriterionId, -1, 'unkn', DateOfRating, RatingValue FROM DeletedFloatRangeRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetCommentRatingsByOffsetForCriterion
@criterionId BIGINT,
@offset INT,
@rowSize INT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;

		IF @offset < 0
		BEGIN
		    THROW 51000, 'The offset cannot be less than 0!', 1;
		END

		IF @rowSize <= 0
		BEGIN
		    THROW 51000, 'The rowSize cannot be less or equal to 0!', 1;
		END

		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, DateOfRating DATETIME,
		Comment VARCHAR(MAX));
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, DateOfRating, Comment)
		SELECT Id, RatingCriterionId, UserId, DateOfRating, Comment FROM CommentRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, DateOfRating, Comment)
		SELECT Id, RatingCriterionId, -1, DateOfRating, Comment FROM DeletedCommentRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC
		OFFSET @offset ROWS
		FETCH NEXT @rowSize ROWS ONLY;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetCommentRatingsByOffsetForCriterionExtended
@criterionId BIGINT,
@offset INT,
@rowSize INT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;

		IF @offset < 0
		BEGIN
		    THROW 51000, 'The offset cannot be less than 0!', 1;
		END

		IF @rowSize <= 0
		BEGIN
		    THROW 51000, 'The rowSize cannot be less or equal to 0!', 1;
		END

		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, UserName VARCHAR(50), DateOfRating DATETIME,
		Comment VARCHAR(MAX));
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, Comment)
		SELECT Id, RatingCriterionId, UserId, UserName, DateOfRating, Comment FROM CommentRatingsViewExtended 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, Comment)
		SELECT Id, RatingCriterionId, -1, 'unkn', DateOfRating, Comment FROM DeletedCommentRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC
		OFFSET @offset ROWS
		FETCH NEXT @rowSize ROWS ONLY;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetAllCommentRatingsForCriterionExtended
@criterionId BIGINT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, UserName VARCHAR(50), DateOfRating DATETIME,
		Comment VARCHAR(MAX));
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, Comment)
		SELECT Id, RatingCriterionId, UserId, UserName, DateOfRating, Comment FROM CommentRatingsViewExtended 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, Comment)
		SELECT Id, RatingCriterionId, -1, 'unkn', DateOfRating, Comment FROM DeletedCommentRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetDocumentRatingsByOffsetForCriterion
@criterionId BIGINT,
@offset INT,
@rowSize INT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;

		IF @offset < 0
		BEGIN
		    THROW 51000, 'The offset cannot be less than 0!', 1;
		END

		IF @rowSize <= 0
		BEGIN
		    THROW 51000, 'The rowSize cannot be less or equal to 0!', 1;
		END

		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, DateOfRating DATETIME,
		DocumentName VARCHAR(MAX), DocumentData VARBINARY(MAX));
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, DateOfRating, DocumentName, DocumentData)
		SELECT Id, RatingCriterionId, UserId, DateOfRating, DocumentName, DocumentData FROM DocumentRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, DateOfRating, DocumentName, DocumentData)
		SELECT Id, RatingCriterionId, -1, DateOfRating, DocumentName, DocumentData FROM DeletedDocumentRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC
		OFFSET @offset ROWS
		FETCH NEXT @rowSize ROWS ONLY;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetDocumentRatingsByOffsetForCriterionExtended
@criterionId BIGINT,
@offset INT,
@rowSize INT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;

		IF @offset < 0
		BEGIN
		    THROW 51000, 'The offset cannot be less than 0!', 1;
		END

		IF @rowSize <= 0
		BEGIN
		    THROW 51000, 'The rowSize cannot be less or equal to 0!', 1;
		END

		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, UserName VARCHAR(50), DateOfRating DATETIME,
		DocumentName VARCHAR(MAX), DocumentData VARBINARY(MAX));
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, DocumentName, DocumentData)
		SELECT Id, RatingCriterionId, UserId, UserName, DateOfRating, DocumentName, DocumentData FROM DocumentRatingsViewExtended 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, DocumentName, DocumentData)
		SELECT Id, RatingCriterionId, -1, 'unkn', DateOfRating, DocumentName, DocumentData FROM DeletedDocumentRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC
		OFFSET @offset ROWS
		FETCH NEXT @rowSize ROWS ONLY;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetAllDocumentRatingsForCriterionExtended
@criterionId BIGINT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, UserName VARCHAR(50), DateOfRating DATETIME,
		DocumentName VARCHAR(MAX), DocumentData VARBINARY(MAX));
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, DocumentName, DocumentData)
		SELECT Id, RatingCriterionId, UserId, UserName, DateOfRating, DocumentName, DocumentData FROM DocumentRatingsViewExtended 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, DocumentName, DocumentData)
		SELECT Id, RatingCriterionId, -1, 'unkn', DateOfRating, DocumentName, DocumentData FROM DeletedDocumentRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetTextRatingsByOffsetForCriterion
@criterionId BIGINT,
@offset INT,
@rowSize INT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;

		IF @offset < 0
		BEGIN
		    THROW 51000, 'The offset cannot be less than 0!', 1;
		END

		IF @rowSize <= 0
		BEGIN
		    THROW 51000, 'The rowSize cannot be less or equal to 0!', 1;
		END

		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, DateOfRating DATETIME,
		TextValueInt INT);
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, DateOfRating, TextValueInt)
		SELECT Id, RatingCriterionId, UserId, DateOfRating, TextValueInt FROM TextValueRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, DateOfRating, TextValueInt)
		SELECT Id, RatingCriterionId, -1, DateOfRating, TextValueInt FROM DeletedTextValueRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC
		OFFSET @offset ROWS
		FETCH NEXT @rowSize ROWS ONLY;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetTextRatingsByOffsetForCriterionExtended
@criterionId BIGINT,
@offset INT,
@rowSize INT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;

		IF @offset < 0
		BEGIN
		    THROW 51000, 'The offset cannot be less than 0!', 1;
		END

		IF @rowSize <= 0
		BEGIN
		    THROW 51000, 'The rowSize cannot be less or equal to 0!', 1;
		END

		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, UserName VARCHAR(50), DateOfRating DATETIME,
		TextValueInt INT);
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, TextValueInt)
		SELECT Id, RatingCriterionId, UserId, UserName, DateOfRating, TextValueInt FROM TextValueRatingsViewExtended
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, TextValueInt)
		SELECT Id, RatingCriterionId, -1, 'unkn', DateOfRating, TextValueInt FROM DeletedTextValueRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC
		OFFSET @offset ROWS
		FETCH NEXT @rowSize ROWS ONLY;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetAllTextRatingsForCriterionExtended
@criterionId BIGINT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, UserName VARCHAR(50), DateOfRating DATETIME,
		TextValueInt INT);
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, TextValueInt)
		SELECT Id, RatingCriterionId, UserId, UserName, DateOfRating, TextValueInt FROM TextValueRatingsViewExtended
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		INSERT INTO @resultTable(Id, RatingCriterionId, UserId, UserName, DateOfRating, TextValueInt)
		SELECT Id, RatingCriterionId, -1, 'unkn', DateOfRating, TextValueInt FROM DeletedTextValueRatingsView 
		WHERE RatingCriterionId = @criterionId
		ORDER BY DateOfRating DESC;
		SELECT * FROM @resultTable
		ORDER BY DateOfRating DESC;
		COMMIT;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE CreateNewCommentRating
@userId BIGINT,
@criterionId BIGINT,
@dateOfRating DATETIME,
@comment VARCHAR(MAX)
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @userCount INT;
		SELECT @userCount = COUNT(Id) FROM [dbo].[User] WHERE Id = @userId;

		-- Check if the user exists
		IF @userCount = 0
		BEGIN
		    THROW 51000, 'The user does not exist!', 1;
		END

		DECLARE @criterionCount INT;
		SELECT @criterionCount = COUNT(Id) FROM RatingCriterion WHERE Id = @criterionId

		-- Check if the criterion already exists
		IF @criterionCount = 0
		BEGIN
		    THROW 51000, 'The criterion does not exist!', 1;
		END

		INSERT INTO Rating(UserId, RatingCriterionId, DateOfRating) VALUES(@userId, @criterionId, @dateOfRating);
		DECLARE @insertedRatingId BIGINT;
		SELECT @insertedRatingId = SCOPE_IDENTITY();
		INSERT INTO CommentRating(Id, Comment) VALUES(@insertedRatingId, @comment);
		COMMIT;
	    RETURN 0;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE CreateNewDocumentRating
@userId BIGINT,
@criterionId BIGINT,
@dateOfRating DATETIME,
@documentName VARCHAR(MAX),
@documentData VARBINARY(MAX)
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @userCount INT;
		SELECT @userCount = COUNT(Id) FROM [dbo].[User] WHERE Id = @userId;

		-- Check if the user exists
		IF @userCount = 0
		BEGIN
		    THROW 51000, 'The user does not exist!', 1;
		END

		DECLARE @criterionCount INT;
		SELECT @criterionCount = COUNT(Id) FROM RatingCriterion WHERE Id = @criterionId

		-- Check if the criterion already exists
		IF @criterionCount = 0
		BEGIN
		    THROW 51000, 'The criterion does not exist!', 1;
		END

		INSERT INTO Rating(UserId, RatingCriterionId, DateOfRating) VALUES(@userId, @criterionId, @dateOfRating);
		DECLARE @insertedRatingId BIGINT;
		SELECT @insertedRatingId = SCOPE_IDENTITY();
		INSERT INTO DocumentRating(Id, DocumentName, DocumentData) VALUES(@insertedRatingId, @documentName, @documentData);
		COMMIT;
	    RETURN 0;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE CreateNumberRangeRating
@userId BIGINT,
@criterionId BIGINT,
@dateOfRating DATETIME,
@ratingValue INT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @userCount INT;
		SELECT @userCount = COUNT(Id) FROM [dbo].[User] WHERE Id = @userId;

		-- Check if the user exists
		IF @userCount = 0
		BEGIN
		    THROW 51000, 'The user does not exist!', 1;
		END

		DECLARE @criterionCount INT;
		SELECT @criterionCount = COUNT(Id) FROM RatingCriterion WHERE Id = @criterionId

		-- Check if the criterion already exists
		IF @criterionCount = 0
		BEGIN
		    THROW 51000, 'The criterion does not exist!', 1;
		END

		DECLARE @minInt INT = 0;
		DECLARE @maxInt INT = 0;

		SELECT @minInt = nr.MinValue, @maxInt = nr.MaxValue FROM RatingCriterion r
		LEFT OUTER JOIN NumberRangeCriterion nr
		ON nr.Id = r.Id
		WHERE r.Id = @criterionId;

		IF NOT(@ratingValue >= @minInt AND @ratingValue <= @maxInt)
		BEGIN
		    THROW 51000, 'The rating value was out of range!', 1;
		END

		INSERT INTO Rating(UserId, RatingCriterionId, DateOfRating) VALUES(@userId, @criterionId, @dateOfRating);
		DECLARE @insertedRatingId BIGINT;
		SELECT @insertedRatingId = SCOPE_IDENTITY();
		INSERT INTO NumberRangeRating(Id, RatingValue) VALUES(@insertedRatingId, @ratingValue);
		COMMIT;
	    RETURN 0;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE CreateFloatRangeRating
@userId BIGINT,
@criterionId BIGINT,
@dateOfRating DATETIME,
@ratingValue FLOAT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @userCount INT;
		SELECT @userCount = COUNT(Id) FROM [dbo].[User] WHERE Id = @userId;

		-- Check if the user exists
		IF @userCount = 0
		BEGIN
		    THROW 51000, 'The user does not exist!', 1;
		END

		DECLARE @criterionCount INT;
		SELECT @criterionCount = COUNT(Id) FROM RatingCriterion WHERE Id = @criterionId

		-- Check if the criterion already exists
		IF @criterionCount = 0
		BEGIN
		    THROW 51000, 'The criterion does not exist!', 1;
		END

		DECLARE @minFloat FLOAT = 0.0;
		DECLARE @maxFloat FLOAT = 0.0;

		SELECT @minFloat = fr.MinValue, @maxFloat = fr.MaxValue FROM RatingCriterion r
		LEFT OUTER JOIN FloatRangeCriterion fr
		ON fr.Id = r.Id
		WHERE r.Id = @criterionId;

		IF NOT(@ratingValue >= @minFloat AND @ratingValue <= @maxFloat)
		BEGIN
		    THROW 51000, 'The rating value was out of range!', 1;
		END

		INSERT INTO Rating(UserId, RatingCriterionId, DateOfRating) VALUES(@userId, @criterionId, @dateOfRating);
		DECLARE @insertedRatingId BIGINT;
		SELECT @insertedRatingId = SCOPE_IDENTITY();
		INSERT INTO FloatRangeRating(Id, RatingValue) VALUES(@insertedRatingId, @ratingValue);
		COMMIT;
	    RETURN 0;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE CreateTextValueRating
@userId BIGINT,
@criterionId BIGINT,
@dateOfRating DATETIME,
@ratingValue INT
AS
BEGIN
  	BEGIN TRY 
	    BEGIN TRANSACTION;
		DECLARE @userCount INT;
		SELECT @userCount = COUNT(Id) FROM [dbo].[User] WHERE Id = @userId;

		-- Check if the user exists
		IF @userCount = 0
		BEGIN
		    THROW 51000, 'The user does not exist!', 1;
		END

		DECLARE @criterionCount INT;
		SELECT @criterionCount = COUNT(Id) FROM RatingCriterion WHERE Id = @criterionId

		-- Check if the criterion already exists
		IF @criterionCount = 0
		BEGIN
		    THROW 51000, 'The criterion does not exist!', 1;
		END

		DECLARE @minVal INT = 0;
		DECLARE @maxVal INT = 0;

		SELECT @minVal = tv.MinValue, @maxVal = tv.MaxValue FROM RatingCriterion r
		LEFT OUTER JOIN TextValueCriterion tv
		ON tv.Id = r.Id
		WHERE r.Id = @criterionId;

		IF NOT(@ratingValue >= @minVal AND @ratingValue <= @maxVal)
		BEGIN
		    THROW 51000, 'The rating value was out of range!', 1;
		END

		INSERT INTO Rating(UserId, RatingCriterionId, DateOfRating) VALUES(@userId, @criterionId, @dateOfRating);
		DECLARE @insertedRatingId BIGINT;
		SELECT @insertedRatingId = SCOPE_IDENTITY();
		INSERT INTO TextValueRating(Id, TextValueInt) VALUES(@insertedRatingId, @ratingValue);
		COMMIT;
	    RETURN 0;
	END TRY  
	BEGIN CATCH  
	    PRINT 'An error occurred.'; 
	   ROLLBACK;
	   THROW
	END CATCH;
END
GO

CREATE OR ALTER PROCEDURE GetAllNumericRatingsAverageForCriterionIdExtended
@criterionId BIGINT
AS 
BEGIN
	DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, UserName VARCHAR(50), DateOfRating DATETIME, RatingValue INT);
	INSERT INTO @resultTable
	EXEC GetAllNumericRatingsForCriterionExtended @criterionId;
	DECLARE @result FLOAT;
	SELECT  AVG(CAST(RatingValue AS FLOAT)) AS "NumericAverage" FROM @resultTable;
END
GO

CREATE OR ALTER PROCEDURE GetAllFloatRatingsAverageForCriterionIdExtended
@criterionId BIGINT
AS 
BEGIN
	DECLARE @resultTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, UserName VARCHAR(50), DateOfRating DATETIME, RatingValue FLOAT);
	INSERT INTO @resultTable
	EXEC GetAllFloatRatingsForCriterionExtended @criterionId;
	DECLARE @result FLOAT;
	SELECT  AVG(CAST(RatingValue AS FLOAT)) AS "FloatAverage" FROM @resultTable;
END
GO

CREATE OR ALTER PROCEDURE GetAllTextRatingsMostCommonValueForCriterionIdExtended
@criterionId BIGINT
AS
BEGIN
	DECLARE @ratingsTable TABLE(Id BIGINT, RatingCriterionId BIGINT, UserId BIGINT, UserName VARCHAR(50), DateOfRating DATETIME,
			TextValueInt INT);
	DECLARE @mostCommonInt INT;
	DECLARE @mostCommonText VARCHAR(50);
	DECLARE @mostCommonIntCount INT;
	INSERT INTO @ratingsTable
	EXEC GetAllTextRatingsForCriterionExtended @criterionId;
	SELECT TOP 1 @mostCommonInt = TextValueInt, @mostCommonIntCount = COUNT(TextValueInt) FROM @ratingsTable
	GROUP BY TextValueInt
	ORDER BY COUNT(TextValueInt) DESC;
	SELECT @mostCommonText = ValueName from TextValueCriteriaView tvcv
	LEFT OUTER JOIN TextValue tv
	ON tvcv.Id = tv.TextValueCriterionId
	WHERE tv.ValueInt = @mostCommonInt;
	DECLARE @result TABLE(ValueText VARCHAR(50), ValueInt INT);
	INSERT INTO @result(ValueText, ValueInt) VALUES(@mostCommonText, @mostCommonInt);
	SELECT ValueText as "ValueText", ValueInt as "ValueInt" FROM @result;
END
GO

-- Triggers
-- Criterion triggers
CREATE OR ALTER TRIGGER RatingCriterionInsertTrigger
ON dbo.RatingCriterion
FOR INSERT, UPDATE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DECLARE @criterionName VARCHAR(50);
		DECLARE @insertedId BIGINT;
		DECLARE @otherNamesCount INT;
		DECLARE @clientId BIGINT;
		SELECT @criterionName = CriterionName, @insertedId = Id, @clientId = ClientId FROM Inserted;
		SELECT @otherNamesCount = COUNT(Id) FROM RatingCriterion WHERE Id != @insertedId AND ClientId = @clientId AND CriterionName = @criterionName;
		
		IF @otherNamesCount > 0
		BEGIN
		      THROW 51000, 'Criterion for the given client already exists!', 1;
		END
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in RatingCriterionInsertTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER CommentCriterionInsertTrigger
ON dbo.CommentCriterion
FOR INSERT, UPDATE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DECLARE @criterionId BIGINT;
		SELECT @criterionId = Id FROM Inserted;
		DECLARE @numberRangeCount INT, @floatRangeCount INT, @textValueCount INT, @documentCount INT;
		SELECT @numberRangeCount = COUNT(Id) FROM NumberRangeCriterion WHERE Id = @criterionId;
		SELECT @floatRangeCount = COUNT(Id) FROM FloatRangeCriterion WHERE Id = @criterionId;
		SELECT @textValueCount = COUNT(Id) FROM TextValueCriterion WHERE Id = @criterionId;
		SELECT @documentCount = COUNT(Id) FROM DocumentCriterion WHERE Id = @criterionId;

		IF @numberRangeCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @floatRangeCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @textValueCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @documentCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in CommentCriterionInsertTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER DocumentCriterionInsertTrigger
ON dbo.DocumentCriterion
FOR INSERT, UPDATE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DECLARE @criterionId BIGINT;
		SELECT @criterionId = Id FROM Inserted;
		DECLARE @numberRangeCount INT, @floatRangeCount INT, @textValueCount INT, @commentCount INT;
		SELECT @numberRangeCount = COUNT(Id) FROM NumberRangeCriterion WHERE Id = @criterionId;
		SELECT @floatRangeCount = COUNT(Id) FROM FloatRangeCriterion WHERE Id = @criterionId;
		SELECT @textValueCount = COUNT(Id) FROM TextValueCriterion WHERE Id = @criterionId;
		SELECT @commentCount = COUNT(Id) FROM CommentCriterion WHERE Id = @criterionId;

		IF @numberRangeCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @floatRangeCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @textValueCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @commentCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in DocumentCriterionInsertTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER NumberRangeCriterionInsertTrigger
ON dbo.NumberRangeCriterion
FOR INSERT, UPDATE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DECLARE @criterionId BIGINT;
		SELECT @criterionId = Id FROM Inserted;
		DECLARE @floatRangeCount INT, @commentCount INT, @textValueCount INT, @documentCount INT, @minValue INT, @maxValue INT, @bestValue INT, @worstValue INT;
		SELECT @minValue = MinValue, @maxValue = MaxValue, @bestValue = BestValue, @worstValue = WorstValue FROM NumberRangeCriterion;
		SELECT @floatRangeCount = COUNT(Id) FROM FloatRangeCriterion WHERE Id = @criterionId;
		SELECT @commentCount = COUNT(Id) FROM CommentCriterion WHERE Id = @criterionId;
		SELECT @textValueCount = COUNT(Id) FROM TextValueCriterion WHERE Id = @criterionId;
		SELECT @documentCount = COUNT(Id) FROM DocumentCriterion WHERE Id = @criterionId;

		IF @floatRangeCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @commentCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @textValueCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @documentCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @minValue >= @maxValue
		BEGIN
		    THROW 51000, 'The minimal value cannot be larger or equal to the maximal value!', 1;
		END

		IF NOT(@minValue = @worstValue OR @minValue = @bestValue)
		BEGIN
		    THROW 51000, 'The minimal value has to equal either to the worst value or to the best value!', 1;
		END

		IF NOT(@maxValue = @worstValue OR @maxValue = @bestValue)
		BEGIN
		    THROW 51000, 'The max value has to equal either to the worst value or to the best value!', 1;
		END

		IF @bestValue = @worstValue
		BEGIN 
		    THROW 51000, 'The best value and the worst value cannot be equal!', 1;
		END
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in NumberRangeCriterionInsertTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER FloatRangeCriterionInsertTrigger
ON dbo.FloatRangeCriterion
FOR INSERT, UPDATE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DECLARE @criterionId BIGINT;
		SELECT @criterionId = Id FROM Inserted;
		DECLARE @numberRangeCount INT, @commentCount INT, @textValueCount INT, @documentCount INT, @minValue FLOAT, @maxValue FLOAT, @bestValue FLOAT, @worstValue FLOAT;
		SELECT @numberRangeCount = COUNT(Id) FROM NumberRangeCriterion WHERE Id = @criterionId;
		SELECT @commentCount = COUNT(Id) FROM CommentCriterion WHERE Id = @criterionId;
		SELECT @textValueCount = COUNT(Id) FROM TextValueCriterion WHERE Id = @criterionId;
		SELECT @documentCount = COUNT(Id) FROM DocumentCriterion WHERE Id = @criterionId;

		IF @numberRangeCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @commentCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @textValueCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @documentCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @minValue >= @maxValue
		BEGIN
		    THROW 51000, 'The minimal value cannot be larger or equal to the maximal value!', 1;
		END

		IF NOT(@minValue = @worstValue OR @minValue = @bestValue)
		BEGIN
		    THROW 51000, 'The minimal value has to equal either to the worst value or to the best value!', 1;
		END

		IF NOT(@maxValue = @worstValue OR @maxValue = @bestValue)
		BEGIN
		    THROW 51000, 'The max value has to equal either to the worst value or to the best value!', 1;
		END

		IF @bestValue = @worstValue
		BEGIN 
		    THROW 51000, 'The best value and the worst value cannot be equal!', 1;
		END
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in FloatRangeCriterionInsertTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER TextValueCriterionInsertTrigger
ON dbo.TextValueCriterion
FOR INSERT, UPDATE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DECLARE @criterionId BIGINT;
		SELECT @criterionId = Id FROM Inserted;
		DECLARE @numberRangeCount INT, @commentCount INT, @floatRangeCount INT, @documentCount INT, @minValue INT, @maxValue INT, @bestValue INT, @worstValue INT;
		SELECT @numberRangeCount = COUNT(Id) FROM NumberRangeCriterion WHERE Id = @criterionId;
		SELECT @commentCount = COUNT(Id) FROM CommentCriterion WHERE Id = @criterionId;
		SELECT @floatRangeCount = COUNT(Id) FROM FloatRangeCriterion WHERE Id = @criterionId;
		SELECT @documentCount = COUNT(Id) FROM DocumentCriterion WHERE Id = @criterionId;

		IF @numberRangeCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @commentCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @floatRangeCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @documentCount > 0
		BEGIN
		      THROW 51000, 'Another criterion with the given ID already exists!', 1;
		END

		IF @minValue >= @maxValue
		BEGIN
		    THROW 51000, 'The minimal value cannot be larger or equal to the maximal value!', 1;
		END

		IF NOT(@minValue = @worstValue OR @minValue = @bestValue)
		BEGIN
		    THROW 51000, 'The minimal value has to equal either to the worst value or to the best value!', 1;
		END

		IF NOT(@maxValue = @worstValue OR @maxValue = @bestValue)
		BEGIN
		    THROW 51000, 'The max value has to equal either to the worst value or to the best value!', 1;
		END

		IF @bestValue = @worstValue
		BEGIN 
		    THROW 51000, 'The best value and the worst value cannot be equal!', 1;
		END
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in TextValueCriterionInsertTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER TextValueInsertTrigger
ON dbo.TextValue
FOR INSERT, UPDATE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DECLARE @criterionId BIGINT, @minValue INT, @maxValue INT, @valueInt INT;
		SELECT @criterionId = TextValueCriterionId, @valueInt = ValueInt FROM Inserted;
		SELECT @minValue = MinValue, @maxValue = MaxValue FROM TextValueCriterion WHERE Id = @criterionId;

		IF NOT(@valueInt >= @minValue AND @valueInt <= @maxValue)
		BEGIN
		    THROW 51000, 'The ordinal value of the text value was out of range!', 1;	
		END
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in TextValueInsertTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER TextValueCriterionDeleteTrigger
ON dbo.TextValueCriterion
INSTEAD OF DELETE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DELETE FROM TextValue WHERE TextValueCriterionId IN (SELECT Id from Deleted);
		DELETE FROM TextValueCriterion WHERE Id IN (SELECT Id FROM Deleted);
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in TextValueCriterionDeleteTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER RatingCriterionDeleteTrigger
ON dbo.RatingCriterion
INSTEAD OF DELETE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DELETE FROM NumberRangeCriterion WHERE Id IN (SELECT Id FROM Deleted);
		DELETE FROM FloatRangeCriterion WHERE Id IN (SELECT Id FROM Deleted);
		DELETE FROM CommentCriterion WHERE Id IN (SELECT Id FROM Deleted);
		DELETE FROM TextValueCriterion WHERE Id IN (SELECT Id FROM Deleted);
		DELETE FROM DocumentCriterion WHERE Id in (SELECT Id FROM Deleted);
		DELETE FROM DeletedRating WHERE RatingCriterionId IN (SELECT Id FROM Deleted);
		DELETE FROM Rating WHERE RatingCriterionId IN (SELECT Id FROM Deleted);
		DELETE FROM RatingCriterion WHERE Id IN (SELECT Id FROM Deleted);
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in RatingCriterionDeleteTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

-- Rating triggers
CREATE OR ALTER TRIGGER CommentRatingInsertTrigger
ON dbo.CommentRating
FOR INSERT, UPDATE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DECLARE @ratingId BIGINT;
		SELECT @ratingId = Id FROM Inserted;
		DECLARE @numberRangeCount INT, @floatRangeCount INT, @textValueCount INT, @documentCount INT;
		SELECT @numberRangeCount = COUNT(Id) FROM NumberRangeRating WHERE Id = @ratingId;
		SELECT @floatRangeCount = COUNT(Id) FROM FloatRangeRating WHERE Id = @ratingId;
		SELECT @textValueCount = COUNT(Id) FROM TextValueRating WHERE Id = @ratingId;
		SELECT @documentCount = COUNT(Id) FROM DocumentRating WHERE Id = @ratingId;

		IF @numberRangeCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @floatRangeCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @textValueCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @documentCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in CommentRatingInsertTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER DocumentRatingInsertTrigger
ON dbo.DocumentRating
FOR INSERT, UPDATE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DECLARE @ratingId BIGINT;
		SELECT @ratingId = Id FROM Inserted;
		DECLARE @numberRangeCount INT, @floatRangeCount INT, @textValueCount INT, @commentCount INT;
		SELECT @numberRangeCount = COUNT(Id) FROM NumberRangeRating WHERE Id = @ratingId;
		SELECT @floatRangeCount = COUNT(Id) FROM FloatRangeRating WHERE Id = @ratingId;
		SELECT @textValueCount = COUNT(Id) FROM TextValueRating WHERE Id = @ratingId;
		SELECT @commentCount = COUNT(Id) FROM CommentRating WHERE Id = @ratingId;

		IF @numberRangeCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @floatRangeCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @textValueCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @commentCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in DocumentRatingInsertTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER NumberRangeRatingInsertTrigger
ON dbo.NumberRangeRating
FOR INSERT, UPDATE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DECLARE @ratingId BIGINT;
		SELECT @ratingId = Id FROM Inserted;
		DECLARE @commentCount INT, @floatRangeCount INT, @textValueCount INT, @documentCount INT, @minInt INT, @maxInt INT, @criterionId INT, @ratingValue INT;
		SELECT @commentCount = COUNT(Id) FROM CommentRating WHERE Id = @ratingId;
		SELECT @floatRangeCount = COUNT(Id) FROM FloatRangeRating WHERE Id = @ratingId;
		SELECT @textValueCount = COUNT(Id) FROM TextValueRating WHERE Id = @ratingId;
		SELECT @documentCount = COUNT(Id) FROM DocumentRating WHERE Id = @ratingId;
		SELECT @ratingValue = RatingValue FROM Inserted;

		IF @commentCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @floatRangeCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @textValueCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @documentCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		SELECT @criterionId = r.RatingCriterionId FROM Rating r
		WHERE r.Id = @ratingId;

		SELECT @minInt = nr.MinValue, @maxInt = nr.MaxValue FROM RatingCriterion r
		LEFT OUTER JOIN NumberRangeCriterion nr
		ON nr.Id = r.Id
		WHERE r.Id = @criterionId;

		IF NOT(@ratingValue >= @minInt AND @ratingValue <= @maxInt)
		BEGIN
		      THROW 51000, 'The rating values was out of range!', 1;
		END
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in NumberRangeRatingInsertTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER FloatRangeRatingInsertTrigger
ON dbo.FloatRangeRating
FOR INSERT, UPDATE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DECLARE @ratingId BIGINT;
		SELECT @ratingId = Id FROM Inserted;
		DECLARE @commentCount INT, @numberRangeCount INT, @textValueCount INT, @documentCount INT, @minFloat FLOAT, @maxFloat FLOAT, @criterionId FLOAT, @ratingValue FLOAT;
		SELECT @commentCount = COUNT(Id) FROM CommentRating WHERE Id = @ratingId;
		SELECT @numberRangeCount = COUNT(Id) FROM NumberRangeRating WHERE Id = @ratingId;
		SELECT @textValueCount = COUNT(Id) FROM TextValueRating WHERE Id = @ratingId;
		SELECT @documentCount = COUNT(Id) FROM DocumentRating WHERE Id = @ratingId;
		SELECT @ratingValue = RatingValue FROM Inserted;

		IF @commentCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @numberRangeCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @textValueCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @documentCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		SELECT @criterionId = r.RatingCriterionId FROM Rating r
		WHERE r.Id = @ratingId;

		SELECT @minFloat = fr.MinValue, @maxFloat = fr.MaxValue FROM RatingCriterion r
		LEFT OUTER JOIN FloatRangeCriterion fr
		ON fr.Id = r.Id
		WHERE r.Id = @criterionId;

		IF NOT(@ratingValue >= @minFloat AND @ratingValue <= @maxFloat)
		BEGIN
		      THROW 51000, 'The rating values was out of range!', 1;
		END
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in FloatRangeRatingInsertTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER TextValueRatingInsertTrigger
ON dbo.TextValueRating
FOR INSERT, UPDATE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DECLARE @ratingId BIGINT;
		SELECT @ratingId = Id FROM Inserted;
		DECLARE @commentCount INT, @numberRangeCount INT, @floatRangeCount INT, @documentCount INT, @minInt INT, @maxInt INT, @criterionId INT, @ratingValue INT;
		SELECT @commentCount = COUNT(Id) FROM CommentRating WHERE Id = @ratingId;
		SELECT @numberRangeCount = COUNT(Id) FROM NumberRangeRating WHERE Id = @ratingId;
		SELECT @floatRangeCount = COUNT(Id) FROM FloatRangeRating WHERE Id = @ratingId;
		SELECT @documentCount = COUNT(Id) FROM DocumentRating WHERE Id = @ratingId;
		SELECT @ratingValue = TextValueInt FROM Inserted;

		IF @commentCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @numberRangeCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @floatRangeCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		IF @documentCount > 0
		BEGIN
		      THROW 51000, 'Another rating with the given ID already exists!', 1;
		END

		SELECT @criterionId = r.RatingCriterionId FROM Rating r
		WHERE r.Id = @ratingId;

		SELECT @minInt = tv.MinValue, @maxInt = tv.MaxValue FROM RatingCriterion r
		LEFT OUTER JOIN TextValueCriterion tv
		ON tv.Id = r.Id
		WHERE r.Id = @criterionId;

		IF NOT(@ratingValue >= @minInt AND @ratingValue <= @maxInt)
		BEGIN
		      THROW 51000, 'The rating values was out of range!', 1;
		END
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in TextValueRatingInsertTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER RatingDeleteTrigger
ON dbo.Rating
INSTEAD OF DELETE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DELETE FROM CommentRating WHERE Id IN (SELECT Id FROM Deleted);
		DELETE FROM NumberRangeRating WHERE Id IN (SELECT Id FROM Deleted);
		DELETE FROM FloatRangeRating WHERE Id IN (SELECT Id FROM Deleted);
		DELETE FROM TextValueRating WHERE Id IN (SELECT Id FROM Deleted);
		DELETE FROM DocumentRating WHERE Id in (SELECT Id FROM Deleted);
		DELETE FROM Rating WHERE Id IN (SELECT Id FROM Deleted);
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in RatingDeleteTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

CREATE OR ALTER TRIGGER DeletedRatingDeleteTrigger
ON dbo.DeletedRating
INSTEAD OF DELETE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DELETE FROM DeletedCommentRating WHERE Id IN (SELECT Id FROM Deleted);
		DELETE FROM DeletedNumberRangeRating WHERE Id IN (SELECT Id FROM Deleted);
		DELETE FROM DeletedFloatRangeRating WHERE Id IN (SELECT Id FROM Deleted);
		DELETE FROM DeletedTextValueRating WHERE Id IN (SELECT Id FROM Deleted);
		DELETE FROM DeletedDocumentRating WHERE Id IN (SELECT Id FROM Deleted);
		DELETE FROM DeletedRating WHERE Id IN (SELECT Id FROM Deleted);
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in DeletedRatingDeleteTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

-- Client triggers
CREATE OR ALTER TRIGGER ClientDeletionTrigger
ON dbo.Client
INSTEAD OF DELETE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		DELETE FROM RatingCriterion WHERE ClientId IN (SELECT Id FROM Deleted);
		DELETE FROM Client WHERE Id IN (SELECT Id FROM Deleted);
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in ClientDeletionTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

-- User triggers
CREATE OR ALTER TRIGGER UserDeletionTrigger
ON [dbo].[User]
INSTEAD OF DELETE
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
		INSERT INTO DeletedRating(Id, RatingCriterionId, DateOfRating)
		SELECT Id, RatingCriterionId, DateOfRating FROM Rating WHERE UserId IN (SELECT Id FROM Deleted);
		INSERT INTO DeletedNumberRangeRating(Id, RatingValue)
		SELECT nr.Id, nr.RatingValue FROM NumberRangeRating nr
		INNER JOIN Rating r ON r.Id = nr.Id WHERE r.UserId IN (SELECT Id FROM Deleted);
		INSERT INTO DeletedFloatRangeRating(Id, RatingValue)
		SELECT fr.Id, fr.RatingValue FROM FloatRangeRating fr
		INNER JOIN Rating r ON r.Id = fr.Id WHERE r.UserId IN (SELECT Id FROM Deleted);
		INSERT INTO DeletedTextValueRating(Id, TextValueInt)
		SELECT tv.Id, tv.TextValueInt FROM TextValueRating tv
		INNER JOIN Rating r ON r.Id = tv.Id WHERE r.UserId IN (SELECT Id FROM Deleted);
		INSERT INTO DeletedCommentRating(Id, Comment)
		SELECT cr.Id, cr.Comment FROM CommentRating cr
		INNER JOIN Rating r ON r.Id = cr.Id WHERE r.UserId IN (SELECT Id FROM Deleted);
		INSERT INTO DeletedDocumentRating(Id, DocumentName, DocumentData)
		SELECT dr.Id, dr.DocumentName, dr.DocumentData FROM DocumentRating dr
		INNER JOIN Rating r ON r.Id = dr.Id WHERE r.UserId IN (SELECT Id FROM Deleted);
		DELETE FROM Rating WHERE UserId IN (SELECT Id FROM Deleted);
		DELETE FROM Client WHERE UserId IN (SELECT Id FROM Deleted);
		DELETE FROM [dbo].[User] WHERE Id IN (SELECT Id FROM Deleted);
		COMMIT;
	END TRY
	BEGIN CATCH
	   PRINT 'An error occurred in UserDeletionTrigger.'; 
	   ROLLBACK;
	   THROW;
	END CATCH
END
GO

--Indexes
CREATE INDEX ClientNameIndex ON Client(Name);
CREATE INDEX RatingsDateIndex ON Rating(DateOfRating DESC);
CREATE INDEX DeletedRatingsDateIndex ON DeletedRating(DateOfRating DESC);

--Views
CREATE OR ALTER VIEW dbo.FloatRangeCriteriaView 
AS  
SELECT frc.Id, rc.ClientId, rc.CriterionName, frc.MinValue, frc.MaxValue, frc.BestValue, frc.WorstValue FROM FloatRangeCriterion frc  
LEFT OUTER JOIN RatingCriterion rc
ON rc.Id = frc.Id
GO  

CREATE OR ALTER VIEW dbo.NumberRangeCriteriaView 
AS  
SELECT nrc.Id, rc.ClientId, rc.CriterionName, nrc.MinValue, nrc.MaxValue, nrc.BestValue, nrc.WorstValue FROM NumberRangeCriterion nrc  
LEFT OUTER JOIN RatingCriterion rc
ON rc.Id = nrc.Id
GO  

CREATE OR ALTER VIEW dbo.CommentCriteriaView 
AS  
SELECT cc.Id, rc.ClientId, rc.CriterionName FROM CommentCriterion cc  
LEFT OUTER JOIN RatingCriterion rc
ON rc.Id = cc.Id
GO  

CREATE OR ALTER VIEW dbo.DocumentCriteriaView 
AS  
SELECT dc.Id, rc.ClientId, rc.CriterionName FROM DocumentCriterion dc
LEFT OUTER JOIN RatingCriterion rc
ON rc.Id = dc.Id
GO  

CREATE OR ALTER VIEW dbo.TextValueCriteriaView
AS
SELECT tvc.Id, rc.ClientId, rc.CriterionName, tvc.MinValue, tvc.MaxValue, tvc.BestValue, tvc.WorstValue FROM TextValueCriterion tvc
LEFT OUTER JOIN RatingCriterion rc
ON rc.Id = tvc.Id
GO

CREATE OR ALTER VIEW dbo.NumberRangeRatingsView 
AS  
SELECT r.Id, r.RatingCriterionId, r.UserId, r.DateOfRating, nr.RatingValue FROM NumberRangeRating nr
LEFT OUTER JOIN Rating r
ON r.Id = nr.Id
GO  

CREATE OR ALTER VIEW dbo.NumberRangeRatingsViewExtended
AS
SELECT r.Id, r.RatingCriterionId, r.UserId, u.UserName, r.DateOfRating, nr.RatingValue FROM NumberRangeRating nr
LEFT OUTER JOIN Rating r
ON r.Id = nr.Id
LEFT OUTER JOIN [dbo].[User] u
ON u.Id = r.UserId
GO

CREATE OR ALTER VIEW dbo.FloatRangeRatingsView 
AS  
SELECT r.Id, r.RatingCriterionId, r.UserId, r.DateOfRating, fr.RatingValue FROM FloatRangeRating fr
LEFT OUTER JOIN Rating r
ON r.Id = fr.Id
GO  

CREATE OR ALTER VIEW dbo.FloatRangeRatingsViewExtended
AS  
SELECT r.Id, r.RatingCriterionId, r.UserId, u.UserName, r.DateOfRating, fr.RatingValue FROM FloatRangeRating fr
LEFT OUTER JOIN Rating r
ON r.Id = fr.Id
LEFT OUTER JOIN [dbo].[User] u
ON u.Id = r.UserId
GO  

CREATE OR ALTER VIEW dbo.TextValueRatingsView
AS  
SELECT r.Id, r.RatingCriterionId, r.UserId, r.DateOfRating, tv.TextValueInt FROM TextValueRating tv
LEFT OUTER JOIN Rating r
ON r.Id = tv.Id
GO  

CREATE OR ALTER VIEW dbo.TextValueRatingsViewExtended
AS  
SELECT r.Id, r.RatingCriterionId, r.UserId, u.UserName, r.DateOfRating, tv.TextValueInt FROM TextValueRating tv
LEFT OUTER JOIN Rating r
ON r.Id = tv.Id
LEFT OUTER JOIN [dbo].[User] u
ON r.UserId = u.Id
GO 

CREATE OR ALTER VIEW dbo.CommentRatingsView 
AS  
SELECT r.Id, r.RatingCriterionId, r.UserId, r.DateOfRating, cr.Comment FROM CommentRating cr
LEFT OUTER JOIN Rating r
ON r.Id = cr.Id
GO  

CREATE OR ALTER VIEW dbo.CommentRatingsViewExtended
AS  
SELECT r.Id, r.RatingCriterionId, r.UserId, u.UserName, r.DateOfRating, cr.Comment FROM CommentRating cr
LEFT OUTER JOIN Rating r
ON r.Id = cr.Id
LEFT OUTER JOIN [dbo].[User] u
ON r.UserId = u.Id
GO  

CREATE OR ALTER VIEW dbo.DocumentRatingsView 
AS  
SELECT r.Id, r.RatingCriterionId, r.UserId, r.DateOfRating, dr.DocumentName, dr.DocumentData FROM DocumentRating dr
LEFT OUTER JOIN Rating r
ON r.Id = dr.Id
GO  

CREATE OR ALTER VIEW dbo.DocumentRatingsViewExtended
AS  
SELECT r.Id, r.RatingCriterionId, r.UserId, u.UserName, r.DateOfRating, dr.DocumentName, dr.DocumentData FROM DocumentRating dr
LEFT OUTER JOIN Rating r
ON r.Id = dr.Id
LEFT OUTER JOIN [dbo].[User] u
ON r.UserId = u.Id
GO  

CREATE OR ALTER VIEW dbo.DeletedNumberRangeRatingsView 
AS  
SELECT r.Id, r.RatingCriterionId, r.DateOfRating, nr.RatingValue FROM DeletedNumberRangeRating nr
LEFT OUTER JOIN DeletedRating r
ON r.Id = nr.Id
GO  

CREATE OR ALTER VIEW dbo.DeletedFloatRangeRatingsView 
AS  
SELECT r.Id, r.RatingCriterionId, r.DateOfRating, fr.RatingValue FROM DeletedFloatRangeRating fr
LEFT OUTER JOIN DeletedRating r
ON r.Id = fr.Id
GO  

CREATE OR ALTER VIEW dbo.DeletedTextValueRatingsView 
AS  
SELECT r.Id, r.RatingCriterionId, r.DateOfRating, tv.TextValueInt FROM DeletedTextValueRating tv
LEFT OUTER JOIN DeletedRating r
ON r.Id = tv.Id
GO  

CREATE OR ALTER VIEW dbo.DeletedCommentRatingsView 
AS  
SELECT r.Id, r.RatingCriterionId, r.DateOfRating, cr.Comment FROM DeletedCommentRating cr
LEFT OUTER JOIN DeletedRating r
ON r.Id = cr.Id
GO  

CREATE OR ALTER VIEW dbo.DeletedDocumentRatingsView 
AS  
SELECT r.Id, r.RatingCriterionId, r.DateOfRating, dr.DocumentName, dr.DocumentData FROM DeletedDocumentRating dr
LEFT OUTER JOIN DeletedRating r
ON r.Id = dr.Id
GO  
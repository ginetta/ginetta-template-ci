#!/bin/bash

# Usage:
# bash deploy-rsync.sh -b master -s build -d user@host:directory


# Parse the script parameters
while [[ $# -gt 0 ]]
do
  key="$1"

  case $key in
    -b|--branch)
    BRANCH="$2"
    shift # past argument
    shift # past value
    ;;
    -s|--source)
    SOURCE="$2"
    shift # past argument
    shift # past value
    ;;
    -h|--host)
    HOST="$2"
    shift # past argument
    shift # past value
    ;;
    -u|--user)
    USER="$2"
    shift # past argument
    shift # past value
    ;;
    -d|--directory)
    DIRECTORY="$2"
    shift # past argument
    shift # past value
    ;;
  esac
done

PARAMETERS_VALIDITY=true

if [ -z "$BRANCH" ]; then
  echo "ERROR: branch not specified, -b or --branch argument must be specified, check your script invocation"
  PARAMETERS_VALIDITY=false
fi

if [ -z "$SOURCE" ]; then
  echo "ERROR: source not specified, -s or --source argument must be specified, check your script invocation"
  PARAMETERS_VALIDITY=false
fi

if [ -z "$HOST" ]; then
  echo "ERROR: host not specified, -h or --host argument must be specified, check your script invocation"
  PARAMETERS_VALIDITY=false
fi

if [ -z "$USER" ]; then
  echo "ERROR: user not specified, -u or --user argument must be specified, check your script invocation"
  PARAMETERS_VALIDITY=false
fi

if [ -z "$DIRECTORY" ]; then
  echo "ERROR: directory not specified, -d or --directory argument must be specified, check your script invocation"
  PARAMETERS_VALIDITY=false
fi

if [ "$PARAMETERS_VALIDITY" == false ]; then
  echo "Exiting with error code 1"
  exit 1
fi

# Creating the destination thanks to the parameters supplied
DESTINATION="$USER@$HOST:$DIRECTORY"

echo "=================================================="
echo "Deploying branch: $BRANCH"
echo "from: $SOURCE"
echo "to: $DESTINATION"
echo "=================================================="
echo ""

echo "Adding SSH deploy key to known host"
echo ""

# Avoid the confirm ssh key prompt
ssh-keyscan -H $HOST >> ~/.ssh/known_hosts

# Create the directory if it does not exist yet
RSYNC_PATH="mkdir -p $DIRECTORY && rsync"

SYNC_OUTPUT=$(rsync -urltv --verbose --delete --rsync-path="$RSYNC_PATH" --rsh="ssh -o BatchMode=yes -p 22" "$SOURCE" "$DESTINATION")

if [[ $? -ne 0 ]];then
    echo "$SYNC_OUTPUT"
    echo "";
    echo "Error when running rsync";
    exit 1
else
    echo "$SYNC_OUTPUT"
    echo ""
    echo "Finished rsync synchronisation"
fi

echo ""
echo "=================================================="
echo "End of deployment"
echo "=================================================="
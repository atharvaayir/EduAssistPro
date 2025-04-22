class seatingArrangement {
    constructor(timeTableData,classRooms,strictnessLevel) {
        this.timeTableData = timeTableData;
        this.classRooms = classRooms;
        this.strictnessLevel = strictnessLevel;
        this.result = {};
        this.classStarts = [];
    }

    NewStart(subId,slot){
        
        for (let classIndex = 0; classIndex < this.classStarts.length; classIndex++) {

            const start = this.classStarts[classIndex];
            const classArrangement = this.result[slot][start[0]]['arrangement'];

            if( this.strictnessLevel===1 &&
                ( start[1] > 0 && classArrangement[start[1]-1][start[2]]===subId ) ||
                ( start[1] < this.classRooms[start[0]].cols-1 && classArrangement[start[1]+1][start[2]]===subId ))
                continue;
            // if( this.strictnessLevel===2 &&
            //     ( start[1] > 0 && classArrangement[start[1]-1][start[2]]===subId ) || // left
            //     ( start[1] < this.classRooms[start[0]].cols-1 && classArrangement[start[1]+1][start[2]]===subId ) || // right
            //     ( start[2] > 0 && classArrangement[start[1]][start[2]-1]===subId ) || // up
            //     ( start[2] < this.classRooms[start[0]].rows-1 && classArrangement[start[1]][start[2]+1]===subId ) || // down
            //     ( start[1] > 0 && start[2] > 0 && classArrangement[start[1]-1][start[2]-1]===subId ) || // up-left
            //     ( start[1] > 0 && start[2] < this.classRooms[start[0]].rows-1 && classArrangement[start[1]-1][start[2]+1]===subId ) || // up-right
            //     ( start[1] < this.classRooms[start[0]].cols-1 && start[2] > 0 && classArrangement[start[1]+1][start[2]-1]===subId ) || // down-left
            //     ( start[1] < this.classRooms[start[0]].cols-1 && start[2] < this.classRooms[start[0]].rows-1 && classArrangement[start[1]+1][start[2]+1]===subId ) // down-right
            // )
            // continue;
            if (this.strictnessLevel === 2) {
                const room = this.classRooms[start[0]];
                const cols = room.cols;
                const rows = room.rows;
                const x = start[1];
                const y = start[2];

                let flag = false;
            
                const directions = [
                    [-1, 0], // left
                    [1, 0], // right
                    [0, -1], // up
                    [0, 1], // down
                    [-1, -1], // up-left
                    [-1, 1], // up-right
                    [1, -1], // down-left
                    [1, 1] // down-right
                ];
            
                for (const [dx, dy] of directions) {
                    const nx = x + dx;
                    const ny = y + dy;
            
                    if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && classArrangement[nx][ny] === subId) {
                        flag=true;
                        break; // Break condition met, skip to next iteration
                    }
                }

                if(flag) continue;
            }
            this.classStarts.splice(classIndex,1);
            this.prevStart = start.slice();
            return start;
        }
        return false;
    }

    findNextSeat(current,slot,subId){
        let classIndex = current[0];
        let col = current[1]
        let row = current[2]
        const currentClassBenchCapacity = this.classRooms[classIndex].benchCapacity;
        const currentClassMaxRow = this.classRooms[classIndex].rows;
        const currentClassMaxCol = this.classRooms[classIndex].cols*this.classRooms[classIndex].benchCapacity;

        if(this.strictnessLevel === 1){
            row += 1;
            if(row>=currentClassMaxRow){
                row = 0;
                col += currentClassBenchCapacity;
                if(col>=currentClassMaxCol){
                    return(this.NewStart(subId,slot));
                }
            }
        }
        else if (this.strictnessLevel === 2){
            row += 2;
            if(row>=currentClassMaxRow){
                row = this.prevStart[2];
                col += currentClassBenchCapacity;
                if(col>=currentClassMaxCol){
                    return(this.NewStart(subId,slot));
                }
            }
        }

        return [ classIndex, col, row ];
    }

    genStarts(){
        for (let index = 0; index < this.classRooms.length; index++) {
            if(this.strictnessLevel===1){
                this.classStarts.push([index,0,0]);
                this.classStarts.push([index,1,0]);
            }
            else if(this.strictnessLevel===2){
                for (let col = 0; col < this.classRooms[index].benchCapacity; col++) {
                    this.classStarts.push([index,col,0]);
                    this.classStarts.push([index,col,1]); 
                }
            }
        }
    }

    seatAlloc(){
        // calculate the total capacity of the classrooms
        let totalCapacity = 0;
        for (const classroom of this.classRooms) {
            const capacity = classroom.rows * classroom.cols * classroom.benchCapacity;
            totalCapacity += capacity;
        }

        try {
            // iterate over each slot
            for (const slot of this.timeTableData){            
            
                // sort the subjects in descending order WRT to the number of students answering it 
                const sortedSubjects = slot.subjects.slice().sort((a, b) => b.students - a.students);

                // calculate the total students in the slot
                let totalStudents = 0;
                for (const subject of slot.subjects) {
                    totalStudents += subject.students;
                }
                if(totalCapacity<totalStudents)
                throw new Error("Number of students is greater than available classroom capacity");

                this.classStarts = [];
                this.genStarts();
                
                // create a entry in the obj such that initially stores has None/Null in them of the size of classes present 
                this.result[slot.name] = this.classRooms.map(classRoom => ({
                    name: classRoom.name,
                    arrangement: Array.from({ length: classRoom.cols * classRoom.benchCapacity }, () =>
                    Array(classRoom.rows).fill(null)
                    ),
                }));
                
                // iterate over all the subjects 
                for (const subObj of sortedSubjects) {
                    const subId = subObj['sub_id'];
                    const students = subObj['students'];
                    
                    // for every subject create a start pointer which points to the location of the 1st student to sit
                    let current = this.NewStart(subId,slot.name);
                    
                    if(current===false){
                        throw new Error("Available classroom capacity is falling short for the chosen seating arrangement");
                    }
                    for(let i = 0; i < students; i++){
                        // console.log("this is here");
                        // console.log(this.result,slot['name'],current[0],current[1],current[2]);
                        
                        this.result[slot['name']][current[0]]['arrangement'][current[1]][current[2]] = subId;
                        
                        if(i!=students-1)
                        current = this.findNextSeat(current,slot['name'],subId);

                        if(current === false){
                            throw new Error("Available classroom capacity is falling short for the chosen seating arrangement");
                        }
                    }

                };
            }
        } catch (error) {
            console.log(error);
            return {result:this.result, message: error.message};
        }
        return {result:this.result, message: "success"};
    }



};
module.exports = seatingArrangement;

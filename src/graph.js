import React from "react";
import { Gitgraph } from "@gitgraph/react";
import { Form, InputGroup, Button } from "react-bootstrap";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branches: [],
      branchName: "",
    };
  }

  addCommit = (branch) => {
    branch.commit(this.state[`commitMessage${branch.name}`]);
  };

  addBranch = () => {
    this.setState(() => ({
      branches: [
        ...this.state.branches,
        this.state.gitgraph.branch(this.state.branchName),
      ],
    }));
  };

  handleChange = (name) => (e) => {
    this.setState({ [name]: e.currentTarget.value });
  };

  clear = () => {
    this.state.gitgraph.clear();
    this.setState({
      branches: [],
    });
  };

  render() {
    const branches = this.state.branches;
    return (
      <div className="modal-body row">
        <div className="col-md-4">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              this.addBranch();
            }}
          >
            <InputGroup className="my-2">
              <Form.Control
                type="text"
                onChange={this.handleChange("branchName")}
              />
              <InputGroup.Append>
                <Button type="submit">Add a branch</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>

          {branches.map((branch) => (
            <Form
              key={branch.name}
              onSubmit={(e) => {
                e.preventDefault();
                this.addCommit(branch);
              }}
            >
              <InputGroup className="my-2">
                <Form.Control
                  type="text"
                  value={this.state[`commitMessage${branch.name}`]}
                  onChange={this.handleChange(`commitMessage${branch.name}`)}
                />
                <InputGroup.Append>
                  <Button type="submit">Commit on {branch.name}</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          ))}
        </div>
        <div class="col-md-8">
          <div
            style={{
              height: "75vh",
              overflowY: "scroll",
              marginBottom: "10px",
            }}
          >
            <Gitgraph children={(gitgraph) => this.setState({ gitgraph })} />
          </div>
          <div className="text-right">
            <Button variant="danger" onClick={this.clear}>
              clear
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;

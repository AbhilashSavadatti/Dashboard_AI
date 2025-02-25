import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import python from "../../assets/icons/pngs/pythonpng.png";
import sql from "../../assets/icons/pngs/sqlpng.png";
import scala from "../../assets/icons/pngs/scalapng.png";
import julia from "../../assets/icons/pngs/juliapng.png";
import matlab from "../../assets/icons/pngs/matlabpng.png";
import sas from "../../assets/icons/pngs/saspng.png";
import java from "../../assets/icons/pngs/javapng.png";
import cplus from "../../assets/icons/pngs/c++png.png";
import Rpng from "../../assets/icons/pngs/Rpng.png";

const Codeviewer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    python: `# Sample Python code
def greet(name):
    return f"Hello, {name}!"

name = "John"
print(greet(name))`,
    r: `# Sample R code
greet <- function(name) {
  paste("Hello,", name)
}

name <- "John"
print(greet(name))`,
    sql: `-- Sample SQL code
SELECT name, age 
FROM users
WHERE age > 18;`,
    java: `// Sample Java code
public class Greet {
  public static String greet(String name) {
    return "Hello, " + name + "!";
  }

  public static void main(String[] args) {
    System.out.println(greet("John"));
  }
}`,
    scala: `// Sample Scala code
object Greet {
  def greet(name: String): String = s"Hello, $name"

  def main(args: Array[String]): Unit = {
    println(greet("John"))
  }
}`,
    julia: `# Sample Julia code
function greet(name)
    return "Hello, $name!"
end

println(greet("John"))`,
    cpp: `// Sample C++ code
#include <iostream>
#include <string>
using namespace std;

string greet(string name) {
  return "Hello, " + name + "!";
}

int main() {
  cout << greet("John") << endl;
  return 0;
}`,
    sas: `* Sample SAS code;
data _null_;
  name = "John";
  put "Hello, " name "!";
run;`,
    matlab: `% Sample MATLAB code
function greeting = greet(name)
  greeting = sprintf('Hello, %s!', name);
end

disp(greet('John'))`,
  };

  const languageIcons = {
    python,
    r: Rpng,
    sql,
    java,
    scala,
    julia,
    cpp: cplus,
    sas,
    matlab,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippets[selectedLanguage]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h1>Code Viewer</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {Object.keys(codeSnippets).map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(lang)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px",
              border: "2px solid",
              borderColor: selectedLanguage === lang ? "#4bdb87" : "#cccccc",
              boxShadow:
                selectedLanguage === lang ? "0 0 10px #4bdb87" : "none",
              backgroundColor: "#ffffff",
              cursor: "pointer",
              borderRadius: "4px",
              fontWeight: "bold",
              transition: "box-shadow 0.2s, border-color 0.2s",
            }}
          >
            <img
              src={languageIcons[lang]}
              alt={lang}
              style={{ width: "24px", height: "24px" }}
            />
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      <div
        style={{
          padding: "20px",
          borderColor: "#4bdb87",
          boxShadow: "0 0 10px #4bdb87",
          borderRadius: "8px",
        }}
      >
        <SyntaxHighlighter language={selectedLanguage} style={okaidia}>
          {codeSnippets[selectedLanguage]}
        </SyntaxHighlighter>
        <button
          onClick={copyToClipboard}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            border: "none",
            backgroundColor: "#4bdb87",
            color: "#282c34",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
    </div>
  );
};

export default Codeviewer;

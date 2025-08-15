'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatBox;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
function ChatBox() {
    var _a = (0, react_1.useState)([]), messages = _a[0], setMessages = _a[1];
    var _b = (0, react_1.useState)(""), input = _b[0], setInput = _b[1];
    var _c = (0, react_1.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    var endRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () { var _a; (_a = endRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" }); }, [messages]);
    function sendMessage() {
        return __awaiter(this, void 0, void 0, function () {
            var userMsg, res, reader, decoder, assistantMsg_1, _a, done, value, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!input.trim())
                            return [2 /*return*/];
                        userMsg = { role: "user", content: input };
                        setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [userMsg], false); });
                        setInput("");
                        setIsLoading(true);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, 7, 8]);
                        return [4 /*yield*/, fetch("/api/chat", {
                                method: "POST", headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ messages: __spreadArray(__spreadArray([], messages, true), [userMsg], false) }),
                            })];
                    case 2:
                        res = _c.sent();
                        if (!res.ok)
                            throw new Error("API failed");
                        reader = res.body.getReader();
                        decoder = new TextDecoder();
                        assistantMsg_1 = { role: "assistant", content: "" };
                        setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [assistantMsg_1], false); });
                        _c.label = 3;
                    case 3:
                        if (!true) return [3 /*break*/, 5];
                        return [4 /*yield*/, reader.read()];
                    case 4:
                        _a = _c.sent(), done = _a.done, value = _a.value;
                        if (done)
                            return [3 /*break*/, 5];
                        assistantMsg_1.content += decoder.decode(value);
                        setMessages(function (prev) { var c = __spreadArray([], prev, true); c[c.length - 1] = assistantMsg_1; return c; });
                        return [3 /*break*/, 3];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        _b = _c.sent();
                        setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{ role: "assistant", content: "Error getting response." }], false); });
                        return [3 /*break*/, 8];
                    case 7:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    }
    return (<div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map(function (m, i) { return (<div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div className={"inline-block p-2 rounded-xl ".concat(m.role === "user" ? "bg-brand-500 text-white" : "bg-bg text-subtext border border-border")}>
              {m.content}
            </div>
          </div>); })}
        {isLoading && <div className="text-subtext">Typing...</div>}
        <div ref={endRef}/>
      </div>
      <div className="flex gap-2 mt-2">
        <input value={input} onChange={function (e) { return setInput(e.target.value); }} onKeyDown={function (e) { return e.key === "Enter" && sendMessage(); }} className="flex-1 bg-bg border border-border rounded-xl p-2 text-white" placeholder="Ask me..."/>
        <button onClick={sendMessage} disabled={isLoading} className="bg-brand-500 p-2 rounded-xl text-white disabled:opacity-50">
          <lucide_react_1.Send size={18}/>
        </button>
      </div>
    </div>);
}
